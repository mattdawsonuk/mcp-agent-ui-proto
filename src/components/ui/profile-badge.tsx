"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { fetchUserProfile } from "@/lib/api"
import { UserProfile } from "@/data/userProfile"

export function ProfileBadge() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const profile = await fetchUserProfile()
        setUserProfile(profile)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (isLoading) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
        disabled
      >
        <div className="h-6 w-6 animate-pulse bg-gray-300 dark:bg-gray-600 rounded-full" />
        <span className="sr-only">Loading profile</span>
      </Button>
    )
  }

  if (error || !userProfile) {
    return (
          <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
      title="Profile unavailable"
      aria-label="Profile unavailable - click to view user profile"
    >
      <User className="h-6 w-6" />
      <span className="sr-only">Profile unavailable</span>
    </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm overflow-hidden"
      title={`${userProfile.name} (${userProfile.email})`}
      aria-label={`User profile for ${userProfile.name} - click to view profile details`}
    >
      {userProfile.avatarUrl ? (
        <img
          src={userProfile.avatarUrl}
          alt={userProfile.name}
          className="h-6 w-6 rounded-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
            const initialsElement = target.nextElementSibling as HTMLElement
            if (initialsElement) {
              initialsElement.style.display = 'flex'
            }
          }}
        />
      ) : null}
      <span
        className={`h-6 w-6 rounded-full bg-blue-500 text-white text-xs font-medium flex items-center justify-center ${
          userProfile.avatarUrl ? 'hidden' : 'flex'
        }`}
      >
        {getInitials(userProfile.name)}
      </span>
      <span className="sr-only">Profile for {userProfile.name}</span>
    </Button>
  )
} 