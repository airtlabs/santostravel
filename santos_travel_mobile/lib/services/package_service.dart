import 'dart:convert';
import 'package:http/http.dart' as http;
import '../core/api_config.dart';
import '../models/travel_package.dart';

class PackageService {
  static Future<List<TravelPackage>> getPackages({
    String? category,
    String? destination,
    String? search,
  }) async {
    try {
      var uri = Uri.parse('${ApiConfig.baseUrl}${ApiConfig.packages}');
      print('🚀 Making API request to: $uri');
      
      // Add query parameters
      Map<String, String> queryParams = {};
      if (category != null && category.isNotEmpty) {
        queryParams['category'] = category;
      }
      if (destination != null && destination.isNotEmpty) {
        queryParams['destination'] = destination;
      }
      if (search != null && search.isNotEmpty) {
        queryParams['search'] = search;
      }
      
      if (queryParams.isNotEmpty) {
        uri = uri.replace(queryParameters: queryParams);
        print('🔍 Query parameters: $queryParams');
      }

      print('📡 Starting HTTP request...');
      final response = await http.get(
        uri,
        headers: ApiConfig.headers,
      ).timeout(ApiConfig.timeout);

      print('📊 Response status: ${response.statusCode}');
      print('📦 Response body length: ${response.body.length}');

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final List<dynamic> packagesJson = data['packages'] ?? [];
        print('✅ Successfully parsed ${packagesJson.length} packages');
        return packagesJson
            .map((json) => TravelPackage.fromJson(json))
            .toList();
      } else {
        print('❌ API Error: ${response.statusCode} - ${response.body}');
        throw Exception('Failed to load packages: ${response.statusCode}');
      }
    } catch (e) {
      print('💥 Exception in getPackages: $e');
      throw Exception('Error fetching packages: $e');
    }
  }

  static Future<TravelPackage> getPackage(String id) async {
    try {
      print('🔍 Fetching package with ID: $id');
      final uri = Uri.parse('${ApiConfig.baseUrl}${ApiConfig.packages}/$id');
      print('🚀 Making API request to: $uri');
      
      final response = await http.get(
        uri,
        headers: ApiConfig.headers,
      ).timeout(ApiConfig.timeout);

      print('📊 Response status: ${response.statusCode}');
      print('📦 Response body: ${response.body}');

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['package'] != null) {
          return TravelPackage.fromJson(data['package']);
        } else {
          // If individual package endpoint doesn't work, fetch from all packages
          print('⚠️ Individual package not found, fetching from all packages');
          final allPackages = await getPackages();
          final package = allPackages.firstWhere(
            (p) => p.id == id,
            orElse: () => throw Exception('Package not found'),
          );
          return package;
        }
      } else {
        // If individual package endpoint doesn't work, fetch from all packages
        print('⚠️ API returned ${response.statusCode}, trying alternative approach');
        final allPackages = await getPackages();
        final package = allPackages.firstWhere(
          (p) => p.id == id,
          orElse: () => throw Exception('Package not found'),
        );
        return package;
      }
    } catch (e) {
      print('💥 Exception in getPackage: $e');
      // Try fetching from all packages as fallback
      try {
        print('🔄 Fallback: fetching from all packages');
        final allPackages = await getPackages();
        final package = allPackages.firstWhere(
          (p) => p.id == id,
          orElse: () => throw Exception('Package not found'),
        );
        return package;
      } catch (fallbackError) {
        throw Exception('Error fetching package: $fallbackError');
      }
    }
  }

  static Future<List<String>> getCategories() async {
    try {
      final packages = await getPackages();
      final categories = packages
          .map((package) => package.category)
          .toSet()
          .toList();
      return categories;
    } catch (e) {
      throw Exception('Error fetching categories: $e');
    }
  }

  static Future<List<String>> getDestinations() async {
    try {
      final packages = await getPackages();
      final destinations = packages
          .map((package) => package.destination)
          .toSet()
          .toList();
      return destinations;
    } catch (e) {
      throw Exception('Error fetching destinations: $e');
    }
  }
}
