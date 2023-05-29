import React, {useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function PagePourSaisirLeCourrielDInvitation() {
    const navigate = useNavigate();
    const form = useRef();
    const { id } = useParams();

    const envoyerEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_smx852m', 'template_rvwkg48', form.current, 'taazExsjBY4UbJS27')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          }
        );
        e.target.reset();
    };

    return (
        <div className="container col-xl-10">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-xl-10 mx-auto col-lg-5">
                    <div className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="mb-3">
                            <h2 className="text-center">Nouveau Message</h2>
                        </div>

                        <form ref={form} onSubmit={envoyerEmail}>
                            <input type="email" className="form-control" name="email" placeholder="Email du joueur" required />
                            <textarea className="form-control" name="message" cols={30} rows={10} hidden>{id}</textarea>
                            <p></p>
                            <button type="submit" className="btn btn-primary">Envoyer</button>&nbsp;
                            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary float-end">Retour</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PagePourSaisirLeCourrielDInvitation