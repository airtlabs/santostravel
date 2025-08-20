class Booking {
  final String id;
  final String packageId;
  final String userName;
  final String userEmail;
  final String userPhone;
  final DateTime travelDate;
  final int participants;
  final double totalAmount;
  final String status;
  final String paymentStatus;
  final String specialRequests;
  final DateTime createdAt;
  final DateTime updatedAt;

  Booking({
    required this.id,
    required this.packageId,
    required this.userName,
    required this.userEmail,
    required this.userPhone,
    required this.travelDate,
    required this.participants,
    required this.totalAmount,
    required this.status,
    required this.paymentStatus,
    required this.specialRequests,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'] ?? '',
      packageId: json['package_id'] ?? '',
      userName: json['user_name'] ?? '',
      userEmail: json['user_email'] ?? '',
      userPhone: json['user_phone'] ?? '',
      travelDate: DateTime.tryParse(json['travel_date'] ?? '') ?? DateTime.now(),
      participants: json['participants'] ?? 0,
      totalAmount: (json['total_amount'] ?? 0).toDouble(),
      status: json['status'] ?? '',
      paymentStatus: json['payment_status'] ?? '',
      specialRequests: json['special_requests'] ?? '',
      createdAt: DateTime.tryParse(json['created_at'] ?? '') ?? DateTime.now(),
      updatedAt: DateTime.tryParse(json['updated_at'] ?? '') ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'package_id': packageId,
      'user_name': userName,
      'user_email': userEmail,
      'user_phone': userPhone,
      'travel_date': travelDate.toIso8601String(),
      'participants': participants,
      'total_amount': totalAmount,
      'status': status,
      'payment_status': paymentStatus,
      'special_requests': specialRequests,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }
}

class CreateBookingRequest {
  final String packageId;
  final String userName;
  final String userEmail;
  final String userPhone;
  final String travelDate;
  final int participants;
  final double totalAmount;
  final String specialRequests;

  CreateBookingRequest({
    required this.packageId,
    required this.userName,
    required this.userEmail,
    required this.userPhone,
    required this.travelDate,
    required this.participants,
    required this.totalAmount,
    this.specialRequests = '',
  });

  Map<String, dynamic> toJson() {
    return {
      'package_id': packageId,
      'user_name': userName,
      'user_email': userEmail,
      'user_phone': userPhone,
      'travel_date': travelDate,
      'participants': participants,
      'total_amount': totalAmount,
      'special_requests': specialRequests,
    };
  }
}
