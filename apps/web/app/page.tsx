"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Folder, Smartphone, Laptop, Palette, ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CollabDrawLanding = () => {

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const drawingElements = [
    { type: 'circle', x: 200, y: 100, color: 'bg-red-500' },
    { type: 'circle', x: 150, y: 150, color: 'bg-gray-300' },
    { type: 'circle', x: 250, y: 150, color: 'bg-gray-300' },
    { type: 'circle', x: 200, y: 200, color: 'bg-gray-300' },
  ];

  const router = useRouter();

  function handleSignin(){
    // const token = localStorage.getItem("token");
    // if(!token){
    //   router.push("/signin")
    // }
    // router.push("/createroom")
    router.push("/signin")
  }
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <nav className=" mx-auto px-2 md:px-6 py-4">
          <div className="flex justify-between items-center">
            <div
              onClick={() => router.push("/")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-6 h-6 sm:w-8 sm:h-8"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <span className="text-lg sm:text-xl font-semibold text-gray-800">
                CollabDraw +
              </span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-3 py-2 sm:px-4 text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                onClick={handleSignin}
              >
                Go to app
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              CollabDraw +
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-600 mb-2 px-4">
              Collaborative whiteboarding made easy
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 px-4">
              Create Shapes, Brainstorm Ideas and much more
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
              onClick={handleSignin}
            >
              Go to app
            </motion.button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-8 sm:mb-12 lg:mb-16">
            <ArrowDown className="mx-auto text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Drawing Demo Section */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 mb-4 max-w-md mx-auto lg:max-w-none">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-600"></div>
                    </button>
                    <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-600 rounded-full"></div>
                    </button>
                    <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-100 rounded">
                      <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  Saving...
                </div>
              </div>

              {/* Drawing Canvas */}
              <div className="bg-gray-50 h-48 sm:h-56 lg:h-64 rounded-lg relative overflow-hidden">
                {/* Drawing Elements */}
                {drawingElements.map((element, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className={`absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full ${element.color}`}
                    style={{
                      left: `${(element.x / 400) * 100}%`,
                      top: `${(element.y / 300) * 100}%`,
                    }}
                  />
                ))}

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <motion.g
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                  >
                    <path
                      d="M 52% 33% L 39.5% 52.5% M 52% 33% L 64.5% 52.5% M 39.5% 52.5% L 52% 66.5% M 64.5% 52.5% L 52% 66.5%"
                      stroke="#6b7280"
                      strokeWidth="2"
                      fill="none"
                    />
                  </motion.g>
                </svg>

                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-xs text-gray-500">
                  Think
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left order-1 lg:order-2 px-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              The easiest way to get
              <br className="hidden sm:block" />
              your thoughts on screen
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Quick drawings and mockups
              <br className="hidden sm:block" />
              with a unique aesthetic
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left px-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Seamless Collaboration
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              No matter whether you work with your team, or invite
              <br className="hidden sm:block" />
              outside collaborators
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-sm mx-4">
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Public Room",
                  "Private Room",
                  "Link Room",
                  "Public Room",
                ].map((room, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700">
                        {room}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-red-400 rounded-full border border-white sm:border-2"></div>
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full border border-white sm:border-2"></div>
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full border border-white sm:border-2"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 sm:mt-4 text-center">
                <ArrowDown className="mx-auto text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                  Invite link
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Management Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Collections</h3>
                <button className="text-blue-600 text-sm">New</button>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Albums", icon: Folder, color: "text-gray-500" },
                  { name: "Drawings", icon: Palette, color: "text-blue-500" },
                  { name: "Sketches", icon: Heart, color: "text-red-500" },
                  {
                    name: "Wireframes",
                    icon: Smartphone,
                    color: "text-green-500",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Favorites</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Folder className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">All files</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Manage & organize
            </h2>
            <p className="text-gray-600">
              All your drawings in one place.
              <br />
              Keep them private, or share them freely.
            </p>
          </motion.div>
        </div>
      </section>

      {/* No Learning Curve Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              No learning curve.
              <br />
              No friction.
            </h2>
            <p className="text-gray-600">Simple, but effective.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center space-x-4">
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
                    <div className="w-4 h-4 border-2 border-gray-600"></div>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
                    <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                  </button>
                  <Palette className="w-4 h-4 text-gray-600" />
                </div>
              </div>

              <div className="relative h-48 bg-gray-50 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <svg className="absolute inset-0 w-full h-full">
                    <ellipse
                      cx="120"
                      cy="80"
                      rx="80"
                      ry="40"
                      stroke="#6b7280"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                    <circle cx="80" cy="80" r="3" fill="#374151" />
                    <circle cx="160" cy="80" r="3" fill="#374151" />
                    <path
                      d="M 80 100 Q 120 120 160 100"
                      stroke="#374151"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </motion.div>

                <div className="absolute bottom-4 left-4">
                  <Laptop className="w-12 h-12 text-gray-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="container mx-auto px-6 py-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Pricing</h2>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">$7</div>
              <div className="text-gray-600">/month</div>
            </div>

            <p className="text-gray-600 mb-6">
              We want to keep things simple,
              <br />
              including pricing!
            </p>

            <div className="text-left mb-6">
              <p className="text-sm text-gray-700 mb-2">
                Additional users $7/month
                <br />
                with 14 days of free trial
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white py-3 cursor-pointer rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => router.push("/signin")}
            >
              Go to app
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-full h-full"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-gray-800">
                  CollabDraw +
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Online</div>
                <div>For teams</div>
                <div>Terms of Use</div>
                <div>Privacy Policy</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Explore</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Blog</div>
                <div>Interviews</div>
                <div>Gear</div>
                <div>Open source</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>For teams</div>
                <div>Pricing</div>
                <div>GitHub</div>
                <div>VS Code</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Contact us</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>support@collabdraw.com</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CollabDrawLanding;