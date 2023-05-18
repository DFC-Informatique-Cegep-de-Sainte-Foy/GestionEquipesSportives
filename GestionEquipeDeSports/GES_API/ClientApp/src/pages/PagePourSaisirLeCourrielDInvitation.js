import React from 'react'
import { useNavigate } from 'react-router-dom';

function PagePourSaisirLeCourrielDInvitation() {
    const navigate = useNavigate();

    return (
        <div className="container col-xl-10">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-xl-10 mx-auto col-lg-5">
                    <div className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="mb-3">
                            <h2 className="text-center">Envoyer l'invitation</h2>
                        </div>

                        <form>
                            <input type="text" className="form-control" name="nom" placeholder="Nom Complet" required />
                            <input type="email" className="form-control" name="email" placeholder="Email" required />
                            <input type="text" className="form-control" name="objetDuCourriel" placeholder="Objet" required />
                            <textarea className="form-control" name="message" cols={30} rows={10}></textarea>
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