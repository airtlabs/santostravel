import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import 'screens/home_screen.dart';
import 'screens/packages_screen.dart';
import 'screens/package_detail_screen.dart';
import 'screens/bookings_screen.dart';
import 'screens/blog_screen.dart';
import 'screens/blog_detail_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/sign_in_screen.dart';
import 'core/theme.dart';

void main() {
  runApp(const ProviderScope(child: SantosApp()));
}

class SantosApp extends StatelessWidget {
  const SantosApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Santos Travel',
      theme: AppTheme.lightTheme,
      routerConfig: _router,
      debugShowCheckedModeBanner: false,
    );
  }
}

final GoRouter _router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/packages',
      builder: (context, state) => const PackagesScreen(),
    ),
    GoRoute(
      path: '/package/:id',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return PackageDetailScreen(packageId: id);
      },
    ),
    GoRoute(
      path: '/bookings',
      builder: (context, state) => const BookingsScreen(),
    ),
    GoRoute(
      path: '/blog',
      builder: (context, state) => const BlogScreen(),
    ),
    GoRoute(
      path: '/blog/:slug',
      builder: (context, state) {
        final slug = state.pathParameters['slug']!;
        return BlogDetailScreen(slug: slug);
      },
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => const ProfileScreen(),
    ),
    GoRoute(
      path: '/signin',
      builder: (context, state) => const SignInScreen(),
    ),
  ],
);
