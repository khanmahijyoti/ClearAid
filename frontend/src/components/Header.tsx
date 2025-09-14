import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { Heart, Menu, X, Plus, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ClearAid
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="hover:bg-accent">
              <Search className="w-4 h-4 mr-2" />
              Explore
            </Button>
            <Button variant="ghost" className="hover:bg-accent">
              About
            </Button>
            <Button variant="ghost" className="hover:bg-accent">
              Contact
            </Button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button variant="gradient" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Create Post
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t bg-background/95 backdrop-blur"
            >
              <div className="py-4 space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  Explore
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  About
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Contact
                </Button>
                <div className="pt-3 border-t space-y-2">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                  <Button variant="gradient" className="w-full">
                    <Plus className="w-4 h-4 mr-1" />
                    Create Post
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}