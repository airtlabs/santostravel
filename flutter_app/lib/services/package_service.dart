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
      }

      final response = await http.get(
        uri,
        headers: ApiConfig.headers,
      ).timeout(ApiConfig.timeout);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final List<dynamic> packagesJson = data['packages'] ?? [];
        return packagesJson
            .map((json) => TravelPackage.fromJson(json))
            .toList();
      } else {
        throw Exception('Failed to load packages: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching packages: $e');
    }
  }

  static Future<TravelPackage> getPackage(String id) async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConfig.baseUrl}${ApiConfig.packages}/$id'),
        headers: ApiConfig.headers,
      ).timeout(ApiConfig.timeout);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return TravelPackage.fromJson(data['package']);
      } else {
        throw Exception('Failed to load package: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching package: $e');
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
