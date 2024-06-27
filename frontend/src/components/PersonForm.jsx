"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"

export default function PersonForm() {
    const defaultForm = {
        name: "",
        identity_number: "",
        email: "",
        date_of_birth: ""
    }
    
    const defaultState = {
        response: null,
        error: {
            value: false,
            message: null
        }
    }

    const [state, setState] = useState({ ...defaultState })
    
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: defaultForm
    })

    const handleIdentityNumberChange = (event) => {
        let value = event.target.value.replace(/\D/g, '')
        if (value.length > 16) value = value.slice(0, 16)
        setValue('identity_number', value, { shouldValidate: true })
    }

    const onReset = () => {
        setState({ ...defaultState })
        reset(defaultForm)
    }

    const onSubmit = data => {
        setState({ ...state, error: { value: false, message: null } })

        const formData = new FormData()
        fetch('http://localhost:8000/api/post', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(({ success, message, data }) => {
            if (!success) throw new Error(message)

            setState({ ...state, response: JSON.stringify(data, null, 2) })
        })
        .catch(e => {
            console.log(e.message)
            setState({ ...state, error: { value: true, message: e.message } })
        })
    }
    
    return (
        <React.Fragment>
            {state.error.value
                ?   <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Oops!</span> {state.error.message}
                        </div>
                    </div>
                : null
            }

            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

                <div className="flex gap-y-3 flex-col mt-5">
                    <div>
                        <label className={errors.name ? 'form-label-error' : 'form-label'} >Name</label>
                        <div className="mt-2">
                            <input
                                {...register('name', { 
                                    required: {
                                        value: 16,
                                        message: 'Please input name!'
                                    }
                                } )}
                                type="text"
                                className={errors.name ? 'form-control-error' : 'form-control'}
                            />
                        </div>
                        {errors.name
                            ?   <p className="text-sm text-red-600 dark:text-red-500">
                                    {errors.name.message}
                                </p>
                            : null
                        }
                    </div>

                    <div>
                        <label className={errors.identity_number ? 'form-label-error' : 'form-label'} >Identity Number</label>
                        <div className="mt-2">
                            <input
                                {...register('identity_number', { 
                                    required: {
                                        value: true,
                                        message: 'Please input identity number!'
                                    },
                                    pattern: {
                                        value: /^\d{16}$/,
                                        message: 'Must number only and 16 digits!'
                                    }
                                })}
                                type="text"
                                onChange={handleIdentityNumberChange}
                                className={errors.identity_number ? 'form-control-error' : 'form-control'}
                            />
                        </div>
                        {errors.identity_number
                            ?   <p className="text-sm text-red-600 dark:text-red-500">
                                    {errors.identity_number.message}
                                </p>
                            : null
                        }
                    </div>

                    <div>
                        <label className={errors.email ? 'form-label-error' : 'form-label'} >Email Address</label>
                        <div className="mt-2">
                            <input
                                {...register('email', {
                                    required: {
                                        value: 16,
                                        message: 'Please input email address'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email format"
                                    }
                        
                                })}
                                type="email" 
                                className={errors.email ? 'form-control-error' : 'form-control'}
                            />
                        </div>
                        {errors.email
                            ?   <p className="text-sm text-red-600 dark:text-red-500">
                                    {errors.email.message}
                                </p>
                            : null
                        }
                    </div>

                    <div>
                        <label className={errors.date_of_birth ? 'form-label-error' : 'form-label'} >Date of Birth</label>
                        <div className="mt-2">
                            <input
                                {...register('date_of_birth', {
                                    required: {
                                        value: true,
                                        message: 'Please input date of birth!'
                                    }
                                })}
                                type="date"
                                className={errors.date_of_birth ? 'form-control-error' : 'form-control'}
                            />
                        </div>
                        {errors.date_of_birth
                            ?   <p className="text-sm text-red-600 dark:text-red-500">
                                    {errors.date_of_birth.message}
                                </p>
                            : null
                        }
                    </div>

                    <div className="flex justify-end items-center gap-x-2 mt-3">
                        <button type="button" className="btn btn-light" onClick={onReset}>
                            Reset
                        </button>

                        <button type="submit" className="btn btn-primary">
                            Send
                        </button>
                    </div>
                </div>
            </form>

            {state.response
                ?   <div className="pt-4">
                        <div>Data saved successfully!</div>
                        <div className="bg-black text-white p-4">
                            <pre>
                                <code>
                                    {state.response}
                                </code>
                            </pre>
                        </div>
                    </div>
                : null
            }
        </React.Fragment>
    )
}