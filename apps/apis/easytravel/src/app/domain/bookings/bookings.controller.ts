import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('bookings')
export class BookingsController {
  @Get()
  getBookings() {
    return 'All travel bookings listed';
  }

  @Get(':id')
  getBookingById(@Param('id') id: string) {
    return `return Booking of id: ${id}`;
  }

  @Post()
  createBooking(@Body() createBooking: unknown) {
    return createBooking;
  }
}
