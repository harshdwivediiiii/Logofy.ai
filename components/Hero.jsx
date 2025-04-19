'use client'; // Mark this component as a client-side component

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you're using a custom button component
import { useClerk, useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation'; // Use next/navigation for client-side routing
import { motion } from 'framer-motion'; // Import Framer Motion
import { TypeAnimation } from 'react-type-animation'; // Import React Type Animation

const HeroPage = () => {
  const { user, isSignedIn, signOut } = useUser(); // Get user state from Clerk
  const { openSignIn } = useClerk(); // Open Clerk's SignIn modal
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Router for navigation

  // Redirect to the dashboard after successful sign-in
  const handleSignIn = () => {
    openSignIn();
  };

  // Redirect to the dashboard page after authentication
  const handleRedirect = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      handleSignIn();
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      setIsLoading(false);
      router.push('/dashboard'); // Automatically redirect to dashboard if signed in
    } else {
      setIsLoading(false);
    }
  }, [isSignedIn, router]);

  return (
    <div className="relative bg-black dark:bg-black h-screen flex items-center justify-center text-black dark:text-white">
      <div className="absolute inset-0 bg-cover bg-center bg-opacity-50" style={{ backgroundImage: 'url("/path/to/your-image.jpg")' }}></div>
      <div className="relative z-10 text-center px-4 md:px-8">
        {/* TypeAnimation for typing effect */}
        <motion.h1 
          className="text-5xl font-bold leading-tight mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <TypeAnimation
            sequence={[
              'Welcome to Your New Journey',
              2000, // 2 seconds delay
              'Unlock your full potential with us.',
              2000,
              'Let\'s make it happen together!',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={0}
          />
        </motion.h1>

        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Unlock your full potential and start creating something amazing with us.
          Let’s make it happen together!
        </motion.p>

        {/* Conditional rendering based on authentication status */}
        {isSignedIn ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <Button
              className="px-8 py-3 text-lg font-semibold bg-yellow-500 text-black rounded-lg shadow-lg hover:bg-yellow-400 transition-colors"
              onClick={handleRedirect}
            >
              Go to Dashboard
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <Button
              className="px-8 py-3 text-lg font-semibold bg-yellow-500 text-black rounded-lg shadow-lg hover:bg-yellow-400 transition-colors"
              onClick={handleSignIn}
            >
              Get Started
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HeroPage;
