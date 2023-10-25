import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex flex-col flex-wrap bg-white px-8 py-5 sticky top-0">
      <div className="flex items-center flex-shrink-0 mr-10">
        <Link href="/">
          <span className="font-semibold text-xl">SkillVista</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
