import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../models/travel_package.dart';
import '../services/package_service.dart';
import '../widgets/bottom_nav_bar.dart';
import '../widgets/package_card.dart';

final packagesProvider = FutureProvider.family<List<TravelPackage>, Map<String, String?>>((ref, filters) async {
  return await PackageService.getPackages(
    category: filters['category'],
    destination: filters['destination'],
    search: filters['search'],
  );
});

class PackagesScreen extends ConsumerStatefulWidget {
  const PackagesScreen({super.key});

  @override
  ConsumerState<PackagesScreen> createState() => _PackagesScreenState();
}

class _PackagesScreenState extends ConsumerState<PackagesScreen> {
  String? selectedCategory;
  String? selectedDestination;
  String? searchQuery;
  final TextEditingController _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final filters = {
      'category': selectedCategory,
      'destination': selectedDestination,
      'search': searchQuery,
    };

    final packagesAsync = ref.watch(packagesProvider(filters));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Travel Packages'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(60),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _searchController,
              decoration: const InputDecoration(
                hintText: 'Search packages...',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
                filled: true,
                fillColor: Colors.white,
              ),
              onSubmitted: (value) {
                setState(() {
                  searchQuery = value.isEmpty ? null : value;
                });
              },
            ),
          ),
        ),
      ),
      body: Column(
        children: [
          // Filters
          Container(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: selectedCategory,
                    decoration: const InputDecoration(
                      labelText: 'Category',
                      border: OutlineInputBorder(),
                    ),
                    items: const [
                      DropdownMenuItem(value: null, child: Text('All Categories')),
                      DropdownMenuItem(value: 'India', child: Text('India')),
                      DropdownMenuItem(value: 'World', child: Text('World')),
                    ],
                    onChanged: (value) {
                      setState(() {
                        selectedCategory = value;
                      });
                    },
                  ),
                ),
                const SizedBox(width: 16),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      selectedCategory = null;
                      selectedDestination = null;
                      searchQuery = null;
                      _searchController.clear();
                    });
                  },
                  child: const Text('Clear'),
                ),
              ],
            ),
          ),

          // Packages List
          Expanded(
            child: packagesAsync.when(
              data: (packages) {
                if (packages.isEmpty) {
                  return const Center(
                    child: Text('No packages found'),
                  );
                }

                return GridView.builder(
                  padding: const EdgeInsets.all(16),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 0.75,
                    crossAxisSpacing: 16,
                    mainAxisSpacing: 16,
                  ),
                  itemCount: packages.length,
                  itemBuilder: (context, index) {
                    return PackageCard(
                      package: packages[index],
                      onTap: () => context.push('/package/${packages[index].id}'),
                    );
                  },
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stack) => Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('Error: $error'),
                    ElevatedButton(
                      onPressed: () => ref.refresh(packagesProvider(filters)),
                      child: const Text('Retry'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: const BottomNavBar(currentIndex: 1),
    );
  }
}
