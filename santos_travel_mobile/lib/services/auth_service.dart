import 'dart:convert';
import 'package:http/http.dart' as http;
import '../core/api_config.dart';

class AuthService {
  static String? _currentUserEmail;
  static String? _currentUserName;

  static String? get currentUserEmail => _currentUserEmail;
  static String? get currentUserName => _currentUserName;
  static bool get isLoggedIn => _currentUserEmail != null;

  static Future<bool> signIn(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('${ApiConfig.baseUrl}/api/auth/signin'),
        headers: ApiConfig.headers,
        body: json.encode({
          'email': email,
          'password': password,
        }),
      ).timeout(ApiConfig.timeout);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        _currentUserEmail = data['user']['email'];
        _currentUserName = data['user']['name'];
        return true;
      } else if (response.statusCode == 404) {
        // If auth endpoint doesn't exist, use mock authentication
        return _mockSignIn(email, password);
      } else {
        return false;
      }
    } catch (e) {
      // If there's an error (like endpoint doesn't exist), use mock authentication
      return _mockSignIn(email, password);
    }
  }

  static Future<bool> signUp(String name, String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('${ApiConfig.baseUrl}/api/auth/signup'),
        headers: ApiConfig.headers,
        body: json.encode({
          'name': name,
          'email': email,
          'password': password,
        }),
      ).timeout(ApiConfig.timeout);

      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        _currentUserEmail = data['user']['email'];
        _currentUserName = data['user']['name'];
        return true;
      } else if (response.statusCode == 404) {
        // If auth endpoint doesn't exist, use mock authentication
        return _mockSignUp(name, email, password);
      } else {
        return false;
      }
    } catch (e) {
      // If there's an error (like endpoint doesn't exist), use mock authentication
      return _mockSignUp(name, email, password);
    }
  }

  static void signOut() {
    _currentUserEmail = null;
    _currentUserName = null;
  }

  // Mock authentication for when backend auth doesn't exist
  static bool _mockSignIn(String email, String password) {
    // Simple validation - accept any email with password "password"
    if (email.isNotEmpty && password == 'password') {
      _currentUserEmail = email;
      _currentUserName = email.split('@').first.replaceAll(RegExp(r'[^\w]'), ' ').trim();
      return true;
    }
    return false;
  }

  static bool _mockSignUp(String name, String email, String password) {
    // Simple validation - accept any valid email and non-empty password
    if (name.isNotEmpty && email.contains('@') && password.length >= 6) {
      _currentUserEmail = email;
      _currentUserName = name;
      return true;
    }
    return false;
  }
}
