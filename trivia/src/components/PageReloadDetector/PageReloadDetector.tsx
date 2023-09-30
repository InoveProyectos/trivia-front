import {useEffect} from "react";
import { useTriviaContext } from "../../Contexts/TriviaContext";
import useTrivia from "../../hooks/useTrivia";

export const PageRealoadDetector = () => {
  const { trivia, user, firstData, nameRoom} = useTriviaContext();
  const {handleReload} = useTrivia()
  const handlePageUnload = ()=>{
    if(user.username && trivia.id){
      const dataToSave = {
        userInfo: user,
        triviaInfo: trivia,
        date: Date.now(),
        nameRoom: nameRoom
      }
      localStorage.setItem('lastReloadTime', JSON.stringify(dataToSave));
    }
  }

  useEffect(() => {
    window.addEventListener('unload', handlePageUnload);
    
    return () => {
      window.removeEventListener('unload', handlePageUnload);
    };
  }, []);

  useEffect(() => {
    // console.log("la pagina fue recargada!!!!!!")
    let dataReload = localStorage.getItem('lastReloadTime');
    if(dataReload){//si existe hago algo y lo elimino sino la abrio por primera vez
      let data = JSON.parse(dataReload)
      let {triviaInfo, userInfo, nameRoom} = data
      if(Object.keys(data).length > 0 && triviaInfo.id && userInfo.username && nameRoom){
        handleReload(triviaInfo, userInfo, nameRoom);
      }
      //Llamar a la funcion que se traiga la data
      localStorage.removeItem('lastReloadTime')
    }

    // if (lastReload) {
    //   let dataAux = JSON.parse(lastReload);
    //   if(Object.keys(dataAux).length > 0 && dataAux.triviaInfo.id && dataAux.userInfo.username){
    //     // La página fue recargada o cerrada recientemente, aquí puedes hacer algo en consecuencia
    //     console.log('La página fue recargada o cerrada recientemente.');
    //     handleReload(dataAux.triviaInfo, dataAux.userInfo);
    //     // localStorage.setItem('lastReloadTime', JSON.stringify({}));
    //     // localStorage.removeItem('lastReloadTime')
    //   }
    // } else {
    //   console.log('La página se abrió por primera vez o después de un tiempo sin recarga.');
    // }
  }, []);

  return <div></div>;
}