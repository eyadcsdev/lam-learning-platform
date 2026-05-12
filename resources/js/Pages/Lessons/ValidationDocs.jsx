import { ValidationDocs } from "@/components/lesson/docs/validation-docs"

export default function Docs({ technology, lesson, is_unlocked }) {
  return <ValidationDocs technology={technology} isUnlocked={is_unlocked} />
}
