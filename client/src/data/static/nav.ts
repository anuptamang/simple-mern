interface NavProps {
  key: number
  text: string
  to: string
}

export const nav: NavProps[] = [
  {
    key: 1,
    text: 'Home',
    to: '/',
  },
  {
    key: 2,
    text: 'Contact',
    to: '/contact',
  },
]
