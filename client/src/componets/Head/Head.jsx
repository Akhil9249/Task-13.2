import React from 'react'
import './Head.css'

export const Head= ({handleChange,inputText,dataStore})=>{
  return (
    <form className='head-container'>
      <input type="text" placeholder='New todo' value={inputText} onChange={handleChange} />
      <button onClick={dataStore}>Add TODO</button>
    </form>
  )
}
