const Footer = () => {
  return (
    <footer className="flex flex-wrap px-10 py-5 border-t-2 border-gray-100 text-center">
      <p className="font-light text-sm text-slate-400 text-center">
        &copy; {new Date().getFullYear().toString()} by Skillvista
      </p>
    </footer>
  )
}

export default Footer
