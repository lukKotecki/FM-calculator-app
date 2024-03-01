import {forwardRef} from 'react'

const Input = forwardRef(function Input({ number, id, handleClick }, ref) {
    return (
      <>
        <span>{number}</span>
        <input
          ref={ref}
          onClick={handleClick}
          className="toggle"
          type="radio"
          name="toggle"
          id={id}
        />
      </>
    )
  })

  export default Input