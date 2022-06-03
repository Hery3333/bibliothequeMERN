import React, {useEffect} from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import {MdKeyboardArrowDown} from 'react-icons/md'
import {RiNotification3Line} from "react-icons/ri"
import {TooltipComponent} from '@syncfusion/ej2-react-popups'
import {Notification, UserProfile} from '.'
import {useStateContext} from '../contexts/ContextProvider'
import avatarAdmin from '../data/avatar_admin.png'


const NavButton = ({ title, customFunc,icon,color,dotColor}) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button type='button' onClick={customFunc} style={{color}} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{ background: dotColor}} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'/> {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const {activeMenu,setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize} = useStateContext()

  useEffect(()=> {
    //Au premier lancement
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize',handleResize);
    handleResize()

    //Second lancement
    return () => window.removeEventListener('resize', handleResize)

  },[])

  useEffect(() => {
    if(screenSize <= 900){
      setActiveMenu(false)
    }else{
      setActiveMenu(true)
    }
  }, [screenSize])

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title="Menu" customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} dotColor="#03C9D7" color="blue" icon={<AiOutlineMenu/>}/>
      <div className='flex'>
      <NavButton title="Notification" customFunc={() => handleClick('notification')} dotColor="#03C9D7" color="blue" icon={<RiNotification3Line/>}/>
        <TooltipComponent content="Profile" position="BottomCenter">
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg" onClick={() => handleClick('userProfile')}>
            <img className='rounded-full w-8 h-8' src={avatarAdmin}/>
            <p>
              <span className='text-gray-400 text-14'>Bonjour, </span>{' '}
              <span className='text-gray-400 font-bold ml-1 text-14'>Admin</span>
              <MdKeyboardArrowDown className='text-gray-400 text-14'/>
            </p>
          </div>
        </TooltipComponent>
        {isClicked.notification && <Notification/>}
        {isClicked.userProfile && <UserProfile/>}
      </div>
    </div>
  )
}

export default Navbar