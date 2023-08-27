import { addIcon } from '@/lib/icons';
import React from 'react'

export default function ButtonFines({ 
    text,
    icon,
    variant,
    hasIcon,
    onClick,
  }:ButtonF) {
    const variants =
      variant === 'primary'
        ? 'bg-primary-900 text-white'
        : 'bg-white border border-primary-900 text-black';
  
    return (
      <button
        className={`flex items-center w-full gap-6 px-4 py-2 rounded-2xl ${variants}`}
        onClick={onClick}
      >
        {hasIcon && icon && <span className="mr-2  ">{addIcon}</span>}
        {text}
      </button>
    )
}
