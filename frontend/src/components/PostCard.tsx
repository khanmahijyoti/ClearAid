import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, DollarSign, User, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { PaymentModal } from './PaymentModal'

interface Post {
  id: number
  authId: number
  title: string
  post: string
  money: number
}

interface PostCardProps {
  post: Post
  index: number
}

export function PostCard({ post, index }: PostCardProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="h-full"
      >
        <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
              {post.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                User #{post.authId}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Today
              </span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1">
            <p className="text-gray-600 dark:text-gray-300 line-clamp-4 leading-relaxed">
              {post.post}
            </p>
            
            {post.money > 0 && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold">Goal: ${post.money.toLocaleString()}</span>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20"
              >
                Learn More
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                onClick={() => setIsPaymentModalOpen(true)}
              >
                <Heart className="w-4 h-4 mr-1" />
                Donate
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        postTitle={post.title}
        postId={post.id}
      />
    </>
  )
}