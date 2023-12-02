import * as React from 'react'

export interface DialogProps {
  title: string
  content: string
  leftButton?: string
  rightButton?: string
  rightFunc?: () => void
  leftFunc?: () => void
}

const Modal = ({ rightButton, leftButton, content, title, rightFunc, leftFunc }: DialogProps) => {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
            <h2 className="text-xl font-bold py-4 ">{title}</h2>
            <p className="text-sm text-gray-500 px-8">{content}</p>
          </div>
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            {leftButton && (
              <button
                onClick={() => leftFunc && leftFunc()}
                className="mb-2 md:mb-0 bg-mainblue borde px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-mainblue"
              >
                {leftButton}
              </button>
            )}
            {rightButton && (
              <button
                onClick={() => rightFunc && rightFunc()}
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              >
                {rightButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.displayName = 'Modal'

export { Modal }
