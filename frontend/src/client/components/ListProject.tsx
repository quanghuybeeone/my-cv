import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModalUpdateComponent from './ModalUpdateComponent'
import ModalDeleteComponent from './ModalDeleteComponent'
import ModalAddComponent from './ModalAddComponent'

interface Project {
    id: number,
    name: string,
    detail: string,
    time: string
}

const ListProject: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const getProjects = async () => {
        const res = await axios.get("http://localhost:3000/api/projects")
        setProjects(res.data)
    }
    useEffect(() => {
        getProjects();
    }, [])

    return (
        <>
        <div className="col-lg-12 mb-4 mb-sm-5">
                <span className="section-title text-primary mb-3 mb-sm-4"   >
                    Project
                    <ModalAddComponent titleModal={'Add new Project'} inputFields={['name', 'detail', 'time']} url="http://localhost:3000/api/projects/" onUpdate={getProjects} />
                </span>

                {projects.map((project) => {
                    return (
                        <div className="row" key={project.id}>
                            <div className='col-lg-3 mb-4 mb-lg-0'>
                                <b>{project.name}</b>
                            </div>
                            <div className='col-lg-5 mb-4 mb-lg-0'>
                                <p>{project.detail}</p>
                            </div>
                            <div className='col-lg-2 mb-4 mb-lg-0'>
                                <p>{project.time}</p>
                            </div>
                            <div className='col-lg-2 mb-2 mb-lg-0 d-flex justify-content-end'>
                                <div>
                                    <ModalUpdateComponent titleModal={'Update Project'} inputFields={['name', 'detail', 'time']} url="http://localhost:3000/api/projects/" targetId={project.id} onUpdate={getProjects} />
                                    <ModalDeleteComponent titleModal={'Delete Project'} url="http://localhost:3000/api/projects/" targetId={project.id} onUpdate={getProjects} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default ListProject