import React from 'react'

const Card:React.FC = () => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl ">
  <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5">
    <p className="mt-1 text-sm text-gray-500">
      Featured
    </p>
  </div>
  <div className="p-4 md:p-5">
    <h3 className="text-lg font-bold text-gray-800">
      Card title
    </h3>
    <p className="mt-2 text-gray-500 ">
      With supporting text below as a natural lead-in to additional content.
    </p>
    <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none " href="#">
      Card link
      <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </a>
  </div>
</div>
  )
}

export default Card