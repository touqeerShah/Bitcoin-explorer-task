import React from "react";
import { useFormik } from 'formik'

const validate = (values) => {
    const errors = {}

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    return errors
}
// here we check email is valid or not
export default function UserEmail(props) {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: (values) => {
            console.log("values.email", values.email);
            localStorage.setItem("email", values.email)
            props.setShowModal(false)
            // alert(JSON.stringify(values, null, 2))
        },
    })
    return (
        <>

            {props.showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {props.title}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={formik.handleSubmit}>

                                    <div className="relative p-6 flex-auto">
                                        <p>{props.message}</p>
                                        <div className="relative w-full mb-3">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" id="email"
                                                className="border-0 px-3 py-3 md:mt-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                            {formik.touched.email && formik.errors.email && (
                                                <span>{formik.errors.email}</span>
                                            )}

                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => props.setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type='submit'
                                            className="w-1/3 px-1  placeholder-blueGray-300 text-blueGray-600 bg-white rounded border-2 text-sm shadow focus:outline-none focus:ring  ease-linear transition-all duration-150"
                                        // onClick={() => { props.setShowModal(false) }}
                                        >
                                            Submit
                                        </button>

                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}