import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose, // Add the DialogClose component for closing
} from '@/components/ui/dialog';
import { icons } from 'lucide-react';
import { iconList } from '@/constant/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function IconListDialog({ selectedIcon }) {
  const [openList, setOpenList] = useState(false);
  const [icon, setIcon] = useState('Anchor'); // Default icon
  const [searchQuery, setSearchQuery] = useState('');
  const [iconSize, setIconSize] = useState(20);
  const [iconColor, setIconColor] = useState('#000');
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false); // State to check if client render

  const itemsPerPage = 20;

  // Set the client render flag to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Set dark mode on client based on system preference or manual toggle
  useEffect(() => {
    if (isClient) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isClient]);

  // Filtered icons based on search query
  const filteredIcons = iconList.filter((icon) =>
    icon.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginated icons
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIcons = filteredIcons.slice(startIndex, startIndex + itemsPerPage);

  const Icon = ({ name, color, size }) => {
    if (!isClient) return null; // Only render icons on client-side
    const LucideIcon = icons[name];
    if (!LucideIcon) {
      return null;
    }
    return <LucideIcon color={color} size={size} />;
  };

  const handleIconClick = (icon) => {
    selectedIcon(icon);
    setIcon(icon);
    setOpenList(false);
  };

  const iconCategories = {
    'Arrows': ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'],
    'Shapes': ['Circle', 'Square', 'Rectangle'],
    'Accessibility': ['Accessibility', 'A11y', 'Wheelchair'],
    'Animals': ['Cat', 'Dog', 'Horse', 'Fish'],
    'Social Media': ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
    'Weather': ['Sun', 'Cloud', 'Rain', 'Snow'],
    'User Interface': ['Search', 'Home', 'Settings', 'Notifications'],
    'Devices': ['Phone', 'Tablet', 'Laptop', 'Desktop'],
    'Transportation': ['Car', 'Bus', 'Bicycle', 'Plane'],
    'Nature': ['Tree', 'Leaf', 'Flower', 'Mountain'],
    'Technology': ['Computer', 'Microchip', 'Server', 'Cloud'],
    'Finance': ['DollarSign', 'CreditCard', 'Wallet', 'PiggyBank'],
    'Food & Drink': ['Pizza', 'Burger', 'Cupcake', 'Coffee'],
    'Health': ['Heart', 'Stethoscope', 'FirstAid', 'Pill'],
    'Education': ['Book', 'GraduationCap', 'School', 'Pencil'],
    'Music': ['MusicNote', 'Headphones', 'Microphone', 'Guitar'],
    'Sports': ['Football', 'Basketball', 'Tennis', 'Baseball'],
    'Shopping': ['ShoppingBag', 'Cart', 'CreditCard', 'Store'],
    'Entertainment': ['Film', 'Camera', 'Popcorn', 'Gamepad'],
    'Travel': ['Globe', 'Compass', 'Suitcase', 'Map'],
    'News': ['Newspaper', 'Tv', 'Radio', 'Megaphone'],
    'Beauty': ['Lipstick', 'NailPolish', 'Mirror', 'Perfume'],
    'Construction': ['Hammer', 'Wrench', 'Saw', 'Brick'],
    'Law': ['Gavel', 'Justice', 'Scales', 'Lawyer'],
    'Security': ['Lock', 'Shield', 'Key', 'Fingerprint'],
    'Business': ['Briefcase', 'Chart', 'Team', 'Office'],
    'Communication': ['MessageCircle', 'Envelope', 'Phone', 'Comment'],
    'Science': ['Flask', 'Microscope', 'Atom', 'DNA'],
    'Space': ['Rocket', 'Planet', 'Astronaut', 'Telescope'],
    'Gaming': ['GameController', 'Joystick', 'PlayStation', 'Xbox'],
    'Fashion': ['T-shirt', 'Dress', 'Shoes', 'Hat'],
    'Vehicles': ['Truck', 'Train', 'Boat', 'Helicopter'],
  };

  return (
    <div>
      <Button onClick={() => setOpenList(true)}>Pick Your Icon</Button>

      <Dialog open={openList}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pick Your Icon</DialogTitle>
            <DialogClose
              className="absolute top-0 right-0 text-gray-800 dark:text-white cursor-pointer"
              onClick={() => setOpenList(false)} // Close the dialog when clicked
            />
            <DialogDescription className="overflow-auto h-[400px]">
              <div>
                {/* Search Bar */}
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search icons..."
                  className="mb-4"
                />

                {/* Display search suggestions */}
                {searchQuery && (
                  <div className="mt-2 bg-gray-100 dark:bg-gray-800 rounded-md p-2">
                    <h4 className="text-sm text-gray-700 dark:text-white">Suggestions:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {filteredIcons.slice(0, 10).map((icon) => (
                        <div
                          key={icon}
                          className="p-3 border flex rounded-sm items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => handleIconClick(icon)}
                        >
                          <Icon name={icon} color={iconColor} size={iconSize} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Icon Preview */}
                <div className="mb-4">
                  <h4 className="text-gray-800 dark:text-white">Selected Icon:</h4>
                  <Icon name={icon} color={iconColor} size={iconSize} />
                </div>

                {/* Icon Categories */}
                {Object.keys(iconCategories).map((category) => (
                  <div key={category} className="mb-6">
                    <h3 className="font-bold text-gray-800 dark:text-white">{category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-5 p-6">
                      {iconCategories[category].map((icon) => (
                        <div
                          key={icon}
                          className="p-3 border flex rounded-sm items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => handleIconClick(icon)}
                        >
                          <Icon name={icon} color={iconColor} size={iconSize} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Icon List */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-5 p-6">
                  {currentIcons.map((icon) => (
                    <div
                      key={icon}
                      className="p-3 border flex rounded-sm items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => handleIconClick(icon)}
                    >
                      <Icon name={icon} color={iconColor} size={iconSize} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between mt-4">
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="dark:bg-gray-800 dark:text-white"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= filteredIcons.length}
                    className="dark:bg-gray-800 dark:text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default IconListDialog;
