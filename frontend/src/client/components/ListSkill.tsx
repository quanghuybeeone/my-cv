import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModalUpdateComponent from './ModalUpdateComponent'
import ModalDeleteComponent from './ModalDeleteComponent'
import ModalAddComponent from './ModalAddComponent'

interface Skill {
    id: number,
    name: string,
    detail: string
}

const ListSkill: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([])
    const getSkills = async () => {
        const res = await axios.get("http://localhost:3000/api/skills")

        setSkills(res.data)
    }
    useEffect(() => {

        getSkills();

    }, [])

    return (
        <>
            <div className="col-lg-12 mb-4 mb-sm-5">
                <span className="section-title text-primary mb-3 mb-sm-4"   >
                    Skill
                    <ModalAddComponent titleModal={'Add new Skill'} inputFields={['name', 'detail']} url="http://localhost:3000/api/skills/" onUpdate={getSkills} />
                </span>

                {skills.map((skill) => {
                    return (
                        <div className="row" key={skill.id}>
                            <div className='col-lg-3 mb-4 mb-lg-0'>
                                <b>{skill.name}</b>
                            </div>
                            <div className='col-lg-7 mb-4 mb-lg-0'>
                                <p>{skill.detail}</p>
                            </div>
                            <div className='col-lg-2 mb-2 mb-lg-0 d-flex justify-content-end'>
                                <div>
                                    <ModalUpdateComponent titleModal={'Update Skill'} inputFields={['name', 'detail']} url="http://localhost:3000/api/skills/" targetId={skill.id} onUpdate={getSkills} />
                                    <ModalDeleteComponent titleModal={'Delete Skill'} url="http://localhost:3000/api/skills/" targetId={skill.id} onUpdate={getSkills} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default ListSkill