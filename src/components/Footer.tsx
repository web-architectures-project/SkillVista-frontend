const Footer = () => {
  return (
    <footer className="flex flex-col  bg-white px-11 py-6 border-t border-gray-300">
      <div className="flex text-center text-gray-500">
        <p className="font-light">
          &copy; {new Date().getFullYear().toString()} by Skillvista
        </p>
      </div>
    </footer>
  )
}
export default Footer
