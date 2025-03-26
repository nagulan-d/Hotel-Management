import React, { useState } from 'react';
import { Hotel, BedDouble, Users, Calendar, ClipboardCheck, Settings, Search, Plus, Filter, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react';

interface Room {
  id: number;
  number: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance';
  guest?: string;
  checkIn?: string;
  checkOut?: string;
}

interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  checkIn: string;
  checkOut: string;
  roomNumber: string;
}

interface Booking {
  id: number;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

function App() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, number: '101', type: 'Single', status: 'available' },
    { id: 2, number: '102', type: 'Double', status: 'occupied', guest: 'John Doe', checkIn: '2024-03-10', checkOut: '2024-03-15' },
    { id: 3, number: '103', type: 'Suite', status: 'maintenance' },
    { id: 4, number: '104', type: 'Single', status: 'available' },
    { id: 5, number: '105', type: 'Double', status: 'occupied', guest: 'Jane Smith', checkIn: '2024-03-12', checkOut: '2024-03-14' },
  ]);

  const [guests, setGuests] = useState<Guest[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234-567-8900',
      address: '123 Main St, City',
      checkIn: '2024-03-10',
      checkOut: '2024-03-15',
      roomNumber: '102'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234-567-8901',
      address: '456 Oak St, City',
      checkIn: '2024-03-12',
      checkOut: '2024-03-14',
      roomNumber: '105'
    }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      guestName: 'John Doe',
      roomNumber: '102',
      checkIn: '2024-03-10',
      checkOut: '2024-03-15',
      status: 'confirmed'
    },
    {
      id: 2,
      guestName: 'Jane Smith',
      roomNumber: '105',
      checkIn: '2024-03-12',
      checkOut: '2024-03-14',
      status: 'confirmed'
    },
    {
      id: 3,
      guestName: 'Bob Johnson',
      roomNumber: '101',
      checkIn: '2024-03-20',
      checkOut: '2024-03-25',
      status: 'pending'
    }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCheckIn = (roomId: number) => {
    const guestName = prompt('Enter guest name:');
    if (!guestName) return;

    setRooms(rooms.map(room => 
      room.id === roomId 
        ? {
            ...room,
            status: 'occupied',
            guest: guestName,
            checkIn: new Date().toISOString().split('T')[0],
            checkOut: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }
        : room
    ));
  };

  const handleCheckOut = (roomId: number) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? {
            ...room,
            status: 'available',
            guest: undefined,
            checkIn: undefined,
            checkOut: undefined
          }
        : room
    ));
  };

  const renderDashboard = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Rooms</h3>
          <p className="text-3xl font-bold text-blue-600">{rooms.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Available Rooms</h3>
          <p className="text-3xl font-bold text-green-600">
            {rooms.filter(room => room.status === 'available').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Occupied Rooms</h3>
          <p className="text-3xl font-bold text-blue-600">
            {rooms.filter(room => room.status === 'occupied').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Maintenance</h3>
          <p className="text-3xl font-bold text-red-600">
            {rooms.filter(room => room.status === 'maintenance').length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {bookings.slice(0, 3).map(booking => (
              <div key={booking.id} className="flex justify-between items-center p-4 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{booking.guestName}</p>
                  <p className="text-sm text-gray-600">Room {booking.roomNumber}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Today's Check-ins</h3>
          <div className="space-y-4">
            {guests.slice(0, 3).map(guest => (
              <div key={guest.id} className="flex justify-between items-center p-4 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{guest.name}</p>
                  <p className="text-sm text-gray-600">Room {guest.roomNumber}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {guest.checkIn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRooms = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search rooms..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Filter size={20} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            Add Room
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div
            key={room.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Room {room.number}</h3>
                <p className="text-gray-600">{room.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(room.status)}`}>
                {room.status}
              </span>
            </div>

            {room.guest && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">Guest: {room.guest}</p>
                <p className="text-sm text-gray-600">Check-in: {room.checkIn}</p>
                <p className="text-sm text-gray-600">Check-out: {room.checkOut}</p>
              </div>
            )}

            <div className="flex gap-2">
              {room.status === 'available' && (
                <button
                  onClick={() => handleCheckIn(room.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Check In
                </button>
              )}
              {room.status === 'occupied' && (
                <button
                  onClick={() => handleCheckOut(room.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Check Out
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGuests = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search guests..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Add Guest
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {guests.map(guest => (
                <tr key={guest.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="font-medium text-gray-900">{guest.name}</div>
                        <div className="text-gray-500">{guest.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-gray-900">
                        <Mail size={16} /> {guest.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Phone size={16} /> {guest.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Room {guest.roomNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {guest.checkIn}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {guest.checkOut}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search bookings..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          New Booking
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    #{booking.id.toString().padStart(4, '0')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {booking.guestName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Room {booking.roomNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {booking.checkIn}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {booking.checkOut}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Hotel Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="Grand Hotel"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              defaultValue="123 Hotel Street&#10;City, State 12345&#10;Country"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="contact@grandhotel.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="+1 234-567-8900"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">System Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Automatic Notifications</h4>
              <p className="text-sm text-gray-600">Send email notifications for bookings and check-ins</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Maintenance Alerts</h4>
              <p className="text-sm text-gray-600">Receive alerts for room maintenance schedules</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-2 text-blue-600">
            <Hotel size={24} />
            <h1 className="text-xl font-bold">Hotel Manager</h1>
          </div>
        </div>
        <nav className="mt-6">
          {[
            { id: 'dashboard', icon: <ClipboardCheck size={20} />, label: 'Dashboard' },
            { id: 'rooms', icon: <BedDouble size={20} />, label: 'Rooms' },
            { id: 'guests', icon: <Users size={20} />, label: 'Guests' },
            { id: 'bookings', icon: <Calendar size={20} />, label: 'Bookings' },
            { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
                activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <p className="text-gray-600">
            Manage {activeTab} and related operations
          </p>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'rooms' && renderRooms()}
        {activeTab === 'guests' && renderGuests()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}

export default App;