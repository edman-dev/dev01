import {
  Music,
  Users,
  Heart,
  Baby,
  GraduationCap,
  Mic,
  Cross,
  BookOpen,
  HelpingHand,
  Globe,
  Coffee,
  Calendar,
  Star,
  Home,
  Church,
} from "lucide-react"
import { MinistryIcon } from "./types"

const iconMap = {
  music: Music,
  users: Users,
  heart: Heart,
  baby: Baby,
  'graduation-cap': GraduationCap,
  mic: Mic,
  cross: Cross,
  'book-open': BookOpen,
  'helping-hand': HelpingHand,
  globe: Globe,
  coffee: Coffee,
  calendar: Calendar,
  star: Star,
  home: Home,
  church: Church,
} as const

export function getMinistryIcon(iconName: MinistryIcon) {
  return iconMap[iconName] || Church
}

export function MinistryIconComponent({ icon, className }: { icon: MinistryIcon; className?: string }) {
  const IconComponent = getMinistryIcon(icon)
  return <IconComponent className={className} />
}