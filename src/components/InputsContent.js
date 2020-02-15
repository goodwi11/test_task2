import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './css/InputsContent.css';
import './css/TagItems.css';

  const tagItemsArr = [
    {
      id: 0,
      label: 'Python'
    }, {
      id: 1,
      label: 'Обучение'
    }, {
      id: 2,
      label: 'Javascript'
    }, {
      id: 3,
      label: 'Web'
    }, {
      id: 4,
      label: 'C++'
    }, {
      id: 5,
      label: 'Data science'
    }
  ];

let buttonArr = [];

const TagItem = (props) => {
  const [state, toggleButton] = React.useState(false);
  let handleButton = () => {
    toggleButton(!state);
    if (state != true) {
      for (let i = 0; i < tagItemsArr.length; i++) {
        if (buttonArr[i] === props.label) {
          return;
        }
      }
      buttonArr.push(props.label);
    } else {
      for (let i = 0; i < tagItemsArr.length; i++) {
        if (buttonArr[i] === props.label) {
          delete buttonArr[i];
        }
      }
    }
  }

  return (
    <div onClick={handleButton}
    className = { state ? 'tagItem_active' : 'tagItem' }>
      <span>{ props.label }</span>
    </div>
  );
};

function InputsContent (props) {

  const [counter0, setCounter0] = React.useState(0);
  const [counter1, setCounter1] = React.useState(0);
  const [header, setHeader] = React.useState();
  const [about, setAbout] = React.useState();
  const [img, setImg] = React.useState();


  const [value, setValue] = React.useState();



const [NewInputs, setNewInputs] = useState(false);

const InputsLoad = (props) => {
  return (
    <div
      className="InputsLoad_item"
      onClick = {() => {if (props.id === 1) { setNewInputs(!NewInputs)}}} >
      <svg width={props.size} height={props.size} color={props.color} fill={props.color} stroke={props.stroke} viewBox={props.viewBox}><path d={props.path}></path></svg>
      <span>{props.text}</span>
    </div>
  )
}

//axios

const handleSubmit = e => {
  let symbCounter = 0;
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[0]["text"].length > 0) {
      symbCounter++;
    }
  }
  if (buttonArr.length < 1) {
    alert('Ошибка! Выберите хотя бы один тег.');
    return;
  }
  if (symbCounter < 3) {
    alert('Ошибка! Добавьте хотя бы 2 вопроса.');
    return;
  } else {
  axios.post(`https://jsonplaceholder.typicode.com/users`, {
    buttonArr: buttonArr,
    header: header,
    about: about,
    img: img,
    inputFields: inputFields
  })
    .then(function(response) {
        console.log(response);
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  e.preventDefault();
}

const [MainQuestion, setMainQuestion] = useState();

const [inputFields, setInputFields] = useState([
    { text: ''}
  ]);

  const handleAddFields = (index) => {
    const values = [...inputFields];
    if (values.length === index + 1) {
      values.push({text: ''});
      setInputFields(values);
    }
  };

  // const handleRemoveFields = () => {
  //   const values = [...inputFields];
  //   delete values[];
  //   setInputFields(values);
  // };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === `question${index}`) {
      values[index].text = event.target.value;
    }

    setInputFields(values);
  };


  const handleCounter = (index, event) => {
    const values = [...inputFields];
      values[index].text = event.target.value;

    setInputFields(values);
  };



  return (
    <form className="InputsContent__wrapper" onSubmit = {handleSubmit}>
        
      <div className="header">
        {tagItemsArr.map((item, key) => (
          <TagItem name='hi' key = { key } label = { item.label }  checked = {item.checked}/>
        ))}
      </div>

      
    <div className="InputItem" >
      <textarea 
      key = {0}
      name={'header'}
      placeholder={'Заголовок'} 
      value = {header} 
      onChange = {(event) => {setCounter0(event.target.value.length); setHeader(event.target.value)}}
      required />
      <span className="counter">{counter0}</span>
    </div>
    <div className="InputItem" >
      <textarea 
      key = {1}
      name={'about'}
      placeholder={'Что вы хотите обсудить?'} 
      value = {about}  
      onChange = {(event) => {setCounter1(event.target.value.length); setAbout(event.target.value)}}
      required />
      <span className="counter">{counter1}</span>
    </div>


      <div className={NewInputs ? 'quiz' : 'quiz_hidden'}>
        <textarea 
          name='mainQuestion'
          placeholder="Задайте вопрос"
          value = { MainQuestion } 
          onChange = {e => setMainQuestion(e.target.value)}
        />
        {inputFields.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
                <input
                  type="text"
                  className="form-control"
                  value={inputField.text} 
                  name = {`question${index}`} 
                  placeholder = {`Вопрос № ${index}`}
                  onChange={event => handleInputChange(index, event)}
                  onClick={() => handleAddFields(index)}
                />
          </Fragment>
        ))}
      </div>

      <div className="InputsLoad">
        <div className="InputsLoad_item">
          <input type="file" name="InputFile" onChange={(e) => setImg(e.target.value)}/>
          <svg width={20} height={20} color='rgb(55, 143, 246)' fill='rgb(55, 143, 246)' stroke='rgb(55, 143, 246)' viewBox='-2 -1 20 20'><path d='M14.6558 0H2.34421C1.05579 0 0 1.07273 0 2.38182V11.6182C0 12.9273 1.05579 14 2.34421 14H14.6558C15.9442 14 17 12.9273 17 11.6182V2.38182C17 1.07273 15.9442 0 14.6558 0ZM11.6137 2.98182C12.3832 2.98182 13.0095 3.61818 13.0095 4.4C13.0095 5.18182 12.3832 5.81818 11.6137 5.81818C10.8442 5.81818 10.2179 5.18182 10.2179 4.4C10.2 3.61818 10.8263 2.98182 11.6137 2.98182ZM13.2063 11.2727H3.52526C3.04211 11.2727 2.73789 10.7273 3.00632 10.3091L6.35263 5.07273C6.60316 4.69091 7.15789 4.69091 7.39053 5.09091L9.55579 8.70909C9.64526 8.87273 9.86 8.89091 9.98526 8.76364L10.7368 8.03636C10.9874 7.8 11.3632 7.8 11.6137 8.05455L13.6537 10.2364C14.0295 10.6182 13.7611 11.2727 13.2063 11.2727Z'></path></svg>
          <span>Фото</span>
        </div>
        <div
          className="InputsLoad_item"
          onClick = {() => setNewInputs(!NewInputs)} >
          <svg width={16} height={16} color='rgb(55, 143, 246)' fill='rgb(55, 143, 246)' viewBox='0 0 14 14'><path d='M6.71946 0C2.99257 0.0215004 -0.013807 3.165 4.76947e-05 7.02591C0.0138468 10.8869 3.04276 14.0072 6.76978 14C8.39627 13.9936 9.96594 13.3796 11.1906 12.2708L6.79048 7.00476V0.00476595L6.71946 0ZM7.60335 0.00863829V0.608553L10.2538 0.610936C9.42203 0.216297 8.51824 0.0109198 7.60335 0.00863829ZM7.60335 0.989829V1.52421L11.6748 1.5263C11.4435 1.33104 11.1993 1.15277 10.9439 0.992808H10.8893L7.60335 0.989829ZM7.60335 1.90549V2.43927L12.553 2.44106C12.4047 2.25453 12.2467 2.07654 12.0797 1.90787H12.0484L7.60335 1.90549ZM7.60335 2.82055V3.35374L13.1557 3.35523C13.0548 3.17232 12.9456 2.99449 12.8284 2.82234H12.7241L7.60335 2.82055ZM7.60335 3.73502V4.26791L13.5824 4.2697C13.5138 4.08859 13.4377 3.91068 13.3541 3.73651L7.60335 3.73502ZM7.60335 4.64919V5.18238L13.842 5.18417C13.8026 5.0045 13.756 4.82662 13.7023 4.65097L7.60335 4.64919ZM7.60335 5.56365V6.09685L13.9783 6.09863C13.9655 5.92015 13.9457 5.74227 13.9191 5.56544L7.60335 5.56365ZM7.60335 6.47812V6.64136L7.91245 7.01131L13.9921 7.0131C14.0006 6.83551 14.0023 6.65764 13.997 6.47991L7.60335 6.47812ZM8.23104 7.39259L8.67643 7.92578H8.71237L13.8762 7.92816C13.9104 7.75146 13.9377 7.57338 13.9579 7.39438L8.23104 7.39259ZM8.9953 8.30706L9.44098 8.84084H9.59683L13.641 8.84382C13.7002 8.66804 13.7522 8.48975 13.7969 8.30944L8.9953 8.30706ZM9.75986 9.22212L10.2061 9.7565L10.3772 9.7568L13.2451 9.76008C13.335 9.58565 13.4173 9.40714 13.4918 9.2251L9.75986 9.22212ZM10.5253 10.1384L10.9724 10.6734L12.6798 10.6778C12.8075 10.5051 12.927 10.326 13.0378 10.1411L10.5253 10.1384ZM11.2916 11.0555L11.7936 11.6563C11.9993 11.47 12.1933 11.2702 12.3744 11.0582L11.2916 11.0555Z'></path></svg>
          <span>Опрос</span>
        </div>
        <div className="submitBtn">
          <button type="submit">Сохранить</button>
        </div>
      </div>
    </form>
  )

}



export default InputsContent;