import { format } from 'date-fns';

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date) {
  return format(new Date(date), 'PPp');
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
  }).format(amount);
}

export function calculateTotalCost(duration, serviceCharge) {
  return duration * serviceCharge;
}

