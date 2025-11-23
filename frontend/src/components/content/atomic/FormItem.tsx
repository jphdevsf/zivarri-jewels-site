interface FormItemProps {
  item: {
    id: number
    label: string
    type: string
    enabled: boolean
    required: boolean
    guidance_text: string
  }
}

export const FormItem = ({ item }: FormItemProps) => {
  const fieldName = `field-${item.id}`
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={fieldName}
      >
        {item.label}
      </label>

      {item.type === 'short text' ? (
        <>
          <input
            id={fieldName}
            type="text"
            className={`w-full max-w-sm px-3 py-2 border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${false ? 'border-red-500' : 'border-gray-300'}`}
            disabled={!item.enabled}
          />
          {/* {error && <span>{error}</span>} */}
        </>
      ) : item.type === 'checkbox' ? (
        <>
          <input
            id={fieldName}
            type="checkbox"
            className="mr-2"
            disabled={!item.enabled}
          />
          {/* {error && <span>{error}</span>} */}
        </>
      ) : (
        <>
          <textarea
            id={fieldName}
            className={`w-full max-w-xl px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${false ? 'border-red-500' : 'border-gray-300'}`}
            disabled={!item.enabled}
            rows={4}
          />
          {/* {error && <span>{error}</span>} */}
        </>
      )}

      {/* {item.guidance_text && (
        <p className="text-xs text-gray-500 my-1">{item.guidance_text}</p>
      )} */}

      {/* {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )} */}
    </div>
  )
}