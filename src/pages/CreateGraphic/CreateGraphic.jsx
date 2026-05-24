import React, { useState } from 'react'
import "./CreateGraphic.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Switch from '../../components/Switch/Switch'
import { useCreateGraphicMutation } from '../../services/graphicsApi'
import Header from '../../components/Header/Header'

const STEPS = ['Title', 'Text', 'Date & Time']

function CreateGraphic() {
  const theme = useSelector((state) => state.themeSlice.theme)
  const userId = useSelector((state) => state.auth.userId)
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    date: '',
    time: '',
  })
const [createGraphic,{isloading}] = useCreateGraphicMutation()
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((s) => ({ ...s, [name]: value }))
  }

  function handleNext() { setStep((s) => s + 1) }
  function handleBack() { setStep((s) => s - 1) }

 async function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
    try{
        const res = await createGraphic({
      ...formData,
      user_id: userId  
    }).unwrap()
    console.log(res)

    
        navigate("/myGraphic")
    }catch(err){
        console.log(err);
        
    }
  }

  const isNextDisabled =
    (step === 0 && !formData.title.trim()) ||
    (step === 1 && !formData.text.trim()) ||
    (step === 2 && (!formData.date || !formData.time))

  return (
    <>
    <Header/>
    <div className={`cg ${theme ? 'cg--dark' : ''}`}>

      <div className="cg__switch">
        <Switch />
      </div>

      <div className="cg__box">
        <div className="cg__logo">
          <span className="cg__logo__dot"></span>
          <span className="cg__logo__name">Orderly day</span>
        </div>

        <div className="cg__steps">
          {STEPS.map((label, i) => (
            <div key={i} className={`cg__step ${i <= step ? 'cg__step--active' : ''}`}>
                 <span className="cg__step__label">{label}</span>
              <div className="cg__step__circle">{i + 1}</div>
             
            </div>
          ))}
        </div>

        <form className="cg__form" onSubmit={handleSubmit}>
          {step === 0 && (
            <>
              <h2 className="cg__title">Name your graphic</h2>
              <p className="cg__subtitle">Give it a clear and short title</p>
              <div className="cg__field">
                <label className="cg__label">Title</label>
                <input className="cg__input" type="text" name="title"
                  placeholder="e.g. Morning routine" value={formData.title} onChange={handleChange} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="cg__title">Describe it</h2>
              <p className="cg__subtitle">Add some details about this graphic</p>
              <div className="cg__field">
                <label className="cg__label">Text</label>
                <textarea className="cg__input cg__textarea" name="text"
                  placeholder="Write something..." value={formData.text} onChange={handleChange} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="cg__title">Set date & time</h2>
              <p className="cg__subtitle">When does this happen?</p>
              <div className="cg__field">
                <label className="cg__label">Date</label>
                <input className="cg__input" type="date" name="date"
                  value={formData.date} onChange={handleChange} />
              </div>
              <div className="cg__field">
                <label className="cg__label">Time</label>
                <input className="cg__input" type="time" name="time"
                  value={formData.time} onChange={handleChange} />
              </div>
            </>
          )}

          <div className="cg__buttons">
            {step > 0 && (
              <button type="button" className="cg__btn__back" onClick={handleBack}>Back</button>
            )}
            {step < STEPS.length - 1 ? (
              <button type="button" className="cg__btn__next" onClick={handleNext} disabled={isNextDisabled}>Next</button>
            ) : (
              <button type="submit" className="cg__btn__next" disabled={isNextDisabled}>Create</button>
            )}
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default CreateGraphic