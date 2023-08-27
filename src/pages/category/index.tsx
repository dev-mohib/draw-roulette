import Menu from "@components/menu";
import React, { useState, useRef, useEffect  } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCloseCircle } from 'react-icons/ai'
import { Category } from "types/index";

export const CategoryPage = () => {
    const [activeName, setName] = useState('')
    const [activeDriveId, setDriveId] = useState('')
    const [activeId, setActiveId] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [list, setList] = useState<Category[]>([])

    const addModalRef = useRef<HTMLDialogElement>(null)
    const editModalRef = useRef<HTMLDialogElement>(null)
    const deleteModalRef = useRef<HTMLDialogElement>(null) 

    useEffect(() => {
        loadCategoties()
    },[])
    const loadCategoties = async() => {
        const output = await fetch(`${import.meta.env.VITE_API_URL}/category`).then(r => r.json())
        setLoading(false)
        setList(output)
    }
    const showAddModal = () => {
        setName('')
        setDriveId('')
        setActiveId('')
        addModalRef.current?.showModal()
    }
    const showEditModal = (category : Category) => {
        setName(category.name)
        setDriveId(category.drive_id)
        setActiveId(category.id)
        editModalRef.current?.showModal()
    }
    const showDeleteModal= (id : any) => {
        setActiveId(id)
        deleteModalRef.current?.showModal()
    }

    const handleAddCategory = async() => {
        const formData = new FormData();
        formData.append('name', activeName);
        formData.append('drive_id', activeDriveId);
        await fetch(`${import.meta.env.VITE_API_URL}/category`, {method : 'POST', body : formData}).then(r => r.json())
        loadCategoties()
        addModalRef.current?.close()
    }
    const handleDeleteCategory = async() => {
        await fetch(`${import.meta.env.VITE_API_URL}/category/${activeId}`, {method : 'Delete'}).then(r => r.json())
        loadCategoties()
        deleteModalRef.current?.close()
    }
    const handleEditCategory = async() => {
        await fetch(`${import.meta.env.VITE_API_URL}/category/${activeId}`, {method : 'PUT', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name : activeName,
            drive_id : activeDriveId
        })}).then(r => r.json())
        loadCategoties()
        editModalRef.current?.close()
    }
    const Category = ({category }: {category : Category})  => (
        <div 
            className="shadow-md m-2 py-5 w-1/2 hover:shadow-xl bg-gray-500 px-10 flex justify-between items-center">
            <div className="">
                {
                    category.name
                }
                <h3>
                {category.drive_id}
                </h3>
            </div>
            <div className="flex">
                <span onClick={_ => showEditModal(category)}  className="mx-3 cursor-pointer">
                    <AiOutlineEdit />
                </span>
                <span onClick={() => showDeleteModal(category.id)}  className="cursor-pointer">
                    <AiOutlineDelete />
                </span>
            </div>
        </div>)

    return(
        <div>
            {/* <Menu /> */}
            <dialog className="w-1/2 transition-all delay-200 border-none"  ref={addModalRef}>
                <div className="flex justify-between items-center">
                    <p className="text-sm">Add New Category</p>
                    <span className="hover:text-red-500 cursor-pointer"  onClick={() => addModalRef.current?.close()}><AiOutlineCloseCircle /></span>
                </div>
                <div className="py-10 w-full">
                    <h4 className="my-2">Category</h4>
                    <input type="text" className="input" placeholder="Name" value={activeName} onChange={e => setName(e.target.value)}/>
                    <input type="text" className="input my-3 mx-2" placeholder="Google Drive ID" value={activeDriveId} onChange={e => setDriveId(e.target.value)}/>
                    <div className="flex justify-end w-full">
                        <button className="btn btn-primary" onClick={handleAddCategory}>Save</button>
                    </div>
                </div>
            </dialog>
            <dialog className="w-1/2 transition-all delay-200 border-none"  ref={editModalRef}>
                <div className="flex justify-between items-center">
                    <p className="text-sm">Edit Category</p>
                    <span className="hover:text-red-500 cursor-pointer"  onClick={_ => editModalRef.current?.close()}><AiOutlineCloseCircle /></span>
                </div>
                <div className="py-10 w-full ">
                    <h4 className="my-2">Category</h4>
                    <input type="text" className="input" placeholder="Name" value={activeName} onChange={e => setName(e.target.value)} />
                    <input type="text" className="input my-3 mx-2" placeholder="Google Drive ID" value={activeDriveId} onChange={e => setDriveId(e.target.value)}/>
                    <div className="flex justify-end w-full">
                        <button className="btn btn-primary" onClick={handleEditCategory}>Save</button>
                    </div>
                </div>
            </dialog>
            <dialog className="w-1/2 transition-all delay-200 border-none"  ref={deleteModalRef}>
                <div className="flex justify-between items-center">
                    <p className="text-sm">Delete Category</p>
                    <span className="hover:text-red-500 cursor-pointer"  onClick={_ => deleteModalRef.current?.close()}><AiOutlineCloseCircle /></span>
                </div>
                <div className="py-10 w-full">
                    <h4 className="my-2">Do you really want to delete category</h4>
                    <div className="flex justify-end">
                        <button className="btn btn-default" onClick={_ => deleteModalRef.current?.close()}>No</button>
                        <button className="btn btn-warning mx-1" onClick={handleDeleteCategory}>Yes</button>
                    </div>
                </div>
            </dialog>
            <h1 className="my-5 text-lg font-normal">Draw Roulette Category Management</h1>

            <div className="w-1/2 flex flex-row justify-between">
                <h1 className="font-sans text-2xl font-semibold">
                    Categories
                </h1>
                
            </div>
            {
                isLoading ? <div>Loading...</div>
                :list.map(category => <Category category={category} key={category.id}  />)
            }
            <div>
                <button className="btn btn-primary m-0" onClick={showAddModal}>
                    Add New
                </button>
            </div>
        </div>
    )
}
