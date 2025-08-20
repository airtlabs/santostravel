class TravelPackage {
  final String id;
  final String title;
  final String description;
  final double price;
  final String duration;
  final String destination;
  final String category;
  final String status;
  final List<String> images;
  final List<ItineraryDay> itinerary;
  final List<String> inclusions;
  final List<String> exclusions;
  final String bookingDeadline;
  final int maxParticipants;
  final String difficultyLevel;
  final String bestTime;
  final String pickupLocation;
  final List<String> highlights;
  final DateTime createdAt;
  final DateTime updatedAt;

  TravelPackage({
    required this.id,
    required this.title,
    required this.description,
    required this.price,
    required this.duration,
    required this.destination,
    required this.category,
    required this.status,
    required this.images,
    required this.itinerary,
    required this.inclusions,
    required this.exclusions,
    required this.bookingDeadline,
    required this.maxParticipants,
    required this.difficultyLevel,
    required this.bestTime,
    required this.pickupLocation,
    required this.highlights,
    required this.createdAt,
    required this.updatedAt,
  });

  factory TravelPackage.fromJson(Map<String, dynamic> json) {
    // Helper function to safely convert to List<String>
    List<String> _safeStringList(dynamic value) {
      if (value == null) return [];
      if (value is List) return value.map((e) => e.toString()).toList();
      if (value is String) return [value]; // Handle case where API returns string instead of array
      return [];
    }

    // Helper function to safely convert to List<ItineraryDay>
    List<ItineraryDay> _safeItineraryList(dynamic value) {
      if (value == null) return [];
      if (value is List) return value.map((e) => ItineraryDay.fromJson(e)).toList();
      return [];
    }

    return TravelPackage(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      price: (json['price'] ?? 0).toDouble(),
      duration: json['duration'] ?? '',
      destination: json['destination'] ?? '',
      category: json['category'] ?? '',
      status: json['status'] ?? '',
      images: _safeStringList(json['images']),
      itinerary: _safeItineraryList(json['itinerary']),
      inclusions: _safeStringList(json['inclusions']),
      exclusions: _safeStringList(json['exclusions']),
      bookingDeadline: json['booking_deadline'] ?? '',
      maxParticipants: json['max_participants'] ?? 0,
      difficultyLevel: json['difficulty_level'] ?? '',
      bestTime: json['best_time'] ?? '',
      pickupLocation: json['pickup_location'] ?? '',
      highlights: _safeStringList(json['highlights']),
      createdAt: DateTime.tryParse(json['created_at'] ?? '') ?? DateTime.now(),
      updatedAt: DateTime.tryParse(json['updated_at'] ?? '') ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'price': price,
      'duration': duration,
      'destination': destination,
      'category': category,
      'status': status,
      'images': images,
      'itinerary': itinerary.map((e) => e.toJson()).toList(),
      'inclusions': inclusions,
      'exclusions': exclusions,
      'booking_deadline': bookingDeadline,
      'max_participants': maxParticipants,
      'difficulty_level': difficultyLevel,
      'best_time': bestTime,
      'pickup_location': pickupLocation,
      'highlights': highlights,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }
}

class ItineraryDay {
  final int day;
  final String title;
  final String description;
  final List<String> activities;
  final List<String> meals;
  final String accommodation;

  ItineraryDay({
    required this.day,
    required this.title,
    required this.description,
    required this.activities,
    required this.meals,
    required this.accommodation,
  });

  factory ItineraryDay.fromJson(Map<String, dynamic> json) {
    // Helper function to safely convert to List<String>
    List<String> _safeStringList(dynamic value) {
      if (value == null) return [];
      if (value is List) return value.map((e) => e.toString()).toList();
      if (value is String) return [value]; // Handle case where API returns string instead of array
      return [];
    }

    return ItineraryDay(
      day: json['day'] ?? 0,
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      activities: _safeStringList(json['activities']),
      meals: _safeStringList(json['meals']),
      accommodation: json['accommodation'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'day': day,
      'title': title,
      'description': description,
      'activities': activities,
      'meals': meals,
      'accommodation': accommodation,
    };
  }
}
