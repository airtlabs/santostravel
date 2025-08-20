import 'dart:convert';
import 'package:http/http.dart' as http;
import '../core/api_config.dart';
import '../models/blog_post.dart';

class BlogService {
  static Future<List<BlogPost>> getBlogPosts({
    String? category,
    String? search,
    String? status = 'published',
  }) async {
    try {
      var uri = Uri.parse('${ApiConfig.baseUrl}${ApiConfig.blogs}');
      
      // Add query parameters
      Map<String, String> queryParams = {};
      if (category != null && category.isNotEmpty) {
        queryParams['category'] = category;
      }
      if (search != null && search.isNotEmpty) {
        queryParams['search'] = search;
      }
      if (status != null && status.isNotEmpty) {
        queryParams['status'] = status;
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
        final List<dynamic> postsJson = data['posts'] ?? [];
        return postsJson
            .map((json) => BlogPost.fromJson(json))
            .toList();
      } else {
        throw Exception('Failed to load blog posts: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching blog posts: $e');
    }
  }

  static Future<BlogPost> getBlogPost(String slug) async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConfig.baseUrl}${ApiConfig.blogs}/$slug'),
        headers: ApiConfig.headers,
      ).timeout(ApiConfig.timeout);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return BlogPost.fromJson(data['post']);
      } else {
        throw Exception('Failed to load blog post: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching blog post: $e');
    }
  }

  static Future<List<String>> getCategories() async {
    try {
      final posts = await getBlogPosts();
      final categories = posts
          .map((post) => post.category)
          .toSet()
          .toList();
      return categories;
    } catch (e) {
      throw Exception('Error fetching blog categories: $e');
    }
  }

  static Future<List<BlogPost>> getRelatedPosts(String currentSlug, String category) async {
    try {
      final posts = await getBlogPosts(category: category);
      return posts
          .where((post) => post.slug != currentSlug)
          .take(3)
          .toList();
    } catch (e) {
      throw Exception('Error fetching related posts: $e');
    }
  }
}
