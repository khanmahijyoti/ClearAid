import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, CreditCard, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('pk_test_51234567890abcdef...')

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  postTitle: string
  postId: number
}

const CheckoutForm = ({ postTitle, postId, onClose }: { postTitle: string, postId: number, onClose: () => void }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!stripe || !elements) return
    
    setLoading(true)
    setError('')

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) return

    try {
      // Create payment method
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (paymentError) {
        setError(paymentError.message || 'Payment failed')
        setLoading(false)
        return
      }

      // Here you would typically send the payment method to your backend
      // For demo purposes, we'll simulate a successful payment
      setTimeout(() => {
        setSuccess(true)
        setLoading(false)
        setTimeout(() => {
          onClose()
          setSuccess(false)
          setAmount('')
        }, 2000)
      }, 2000)

    } catch (err) {
      setError('Payment failed. Please try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-600 mb-2">Thank You!</h3>
        <p className="text-muted-foreground">Your donation has been processed successfully.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Donation Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="pl-8"
            min="1"
            step="0.01"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Card Details</label>
        <Card>
          <CardContent className="p-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: 'hsl(var(--foreground))',
                    '::placeholder': {
                      color: 'hsl(var(--muted-foreground))',
                    },
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lock className="w-4 h-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <Button
        type="submit"
        disabled={!stripe || loading || !amount}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Donate ${amount || '0.00'}
          </div>
        )}
      </Button>
    </form>
  )
}

export function PaymentModal({ isOpen, onClose, postTitle, postId }: PaymentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Make a Donation
          </DialogTitle>
          <DialogDescription>
            Support "{postTitle}" with your generous donation
          </DialogDescription>
        </DialogHeader>
        
        <Elements stripe={stripePromise}>
          <CheckoutForm postTitle={postTitle} postId={postId} onClose={onClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  )
}