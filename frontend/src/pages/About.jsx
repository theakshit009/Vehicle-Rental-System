import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, DollarSign, MapPin, Users, Award, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const About = () => {
    const features = [
        {
            icon: Car,
            title: 'Wide Selection',
            description: 'Choose from over 500 vehicles including sedans, SUVs, luxury cars, and more.',
        },
        {
            icon: DollarSign,
            title: 'Best Prices',
            description: 'Competitive rates with transparent pricing and no hidden fees.',
        },
        {
            icon: Clock,
            title: '24/7 Support',
            description: 'Round-the-clock customer service to assist you anytime, anywhere.',
        },
        {
            icon: Shield,
            title: 'Verified Vehicles',
            description: 'All vehicles are regularly inspected and maintained to highest standards.',
        },
        {
            icon: MapPin,
            title: '50+ Locations',
            description: 'Convenient pickup and drop-off points across major cities.',
        },
        {
            icon: Users,
            title: 'Trusted by Thousands',
            description: 'Join thousands of satisfied customers who trust us for their journeys.',
        },
    ];

    const stats = [
        { value: '500+', label: 'Vehicles' },
        { value: '10,000+', label: 'Happy Customers' },
        { value: '50+', label: 'Cities Covered' },
        { value: '15', label: 'Years Experience' },
    ];

    const values = [
        'Customer satisfaction is our top priority',
        'Transparent and honest business practices',
        'Quality vehicles with regular maintenance',
        'Fair pricing with no hidden charges',
        'Environmental responsibility',
        'Innovation in service delivery',
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
                            About VehicleRental
                        </h1>
                        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
                            Your trusted partner for seamless and affordable vehicle rentals across India.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Our Story
                            </h2>
                            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                                Founded in 2010, VehicleRental has grown from a small startup with just 10 vehicles
                                to one of India's leading vehicle rental platforms with over 500 vehicles across 50+ cities.
                                Our journey began with a simple mission: to make vehicle rentals easy, affordable, and accessible
                                for everyone.
                            </p>
                            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                                Over the years, we've served thousands of satisfied customers, from business travelers and
                                families to adventure seekers and daily commuters. Our commitment to quality service,
                                transparent pricing, and customer satisfaction has made us a trusted name in the industry.
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Today, we continue to innovate and expand our services, leveraging technology to provide
                                a seamless booking experience while maintaining the personal touch that our customers love.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-gradient-to-br from-indigo-50 to-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-slate-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Why Choose Us
                        </h2>
                        <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            We're committed to providing the best vehicle rental experience with
                            exceptional service and unmatched value.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Our Values
                            </h2>
                            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                                >
                                    <CheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-700 font-medium">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-indigo-600">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Browse our wide selection of vehicles and book your perfect ride today.
                    </p>
                    <Link to="/search">
                        <Button variant="secondary" size="lg">
                            Browse Vehicles
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
