import 'dart:convert';
import 'package:http/http.dart' as http;
import '../core/api_config.dart';
import '../models/booking.dart';

class BookingService {
  static Future<List<Booking>> getBookings({String? userEmail}) async {
    try {
      var uri = Uri.parse('${ApiConfig.baseUrl}${ApiConfig.bookings}');
      
      // Add query parameters
      if (userEmail != null && userEmail.isNotEmpty) {
        uri = uri.replace(queryParameters: {'user_email': userEmail});
      }

      final response = await http.get(
        uri,
        headers: ApiConfig.headers,
      ).timeout(ApiConfig.timeout);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final List<dynamic> bookingsJson = data['bookings'] ?? [];
        return bookingsJson
            .map((json) => Booking.fromJson(json))
            .toList();
      } else {
        throw Exception('Failed to load bookings: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching bookings: $e');
    }
  }

  static Future<Booking> getBooking(String id) async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConfig.baseUrl}${ApiConfig.bookings}/$id'),
        headers: ApiConfig.headers,
      ).timeout(ApiConfig.timeout);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return Booking.fromJson(data['booking']);
      } else {
        throw Exception('Failed to load booking: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching booking: $e');
    }
  }

  static Future<Booking> createBooking(CreateBookingRequest request) async {
    try {
      final response = await http.post(
        Uri.parse('${ApiConfig.baseUrl}${ApiConfig.bookings}'),
        headers: ApiConfig.headers,
        body: json.encode(request.toJson()),
      ).timeout(ApiConfig.timeout);

      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        return Booking.fromJson(data['booking']);
      } else {
        final errorData = json.decode(response.body);
        throw Exception(errorData['error'] ?? 'Failed to create booking');
      }
    } catch (e) {
      throw Exception('Error creating booking: $e');
    }
  }

  static Future<void> updateBookingStatus(String id, String status) async {
    try {
      final response = await http.put(
        Uri.parse('${ApiConfig.baseUrl}${ApiConfig.bookings}/$id'),
        headers: ApiConfig.headers,
        body: json.encode({'status': status}),
      ).timeout(ApiConfig.timeout);

      if (response.statusCode != 200) {
        throw Exception('Failed to update booking status: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error updating booking: $e');
    }
  }
}
