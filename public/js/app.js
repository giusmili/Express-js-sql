document.addEventListener("DOMContentLoaded",()=>{
    const submitForm = async (formData) => {
        try {
            // Vérifier si les champs du formulaire sont vides
            if (!formData.nom || !formData.prenom || !formData.date || !formData.phone) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Veuillez remplir tous les champs du formulaire.",
                    footer: '<a href="#">Why do I have this issue?</a>'
                    });

                console.error('Veuillez remplir tous les champs du formulaire.');
                return;
            }
    
            const response = await fetch('http://localhost:3000/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                Swal.fire({
                    title: "Good job!",
                    text: "Données du formulaire soumises avec succès",
                    icon: "success"
                  });
                console.log('Données du formulaire soumises avec succès');
            } else {
                
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Échec de la soumission des données du formulaire",
                    footer: '<a href="#">Why do I have this issue?</a>'
                    });
                    

                console.error('Échec de la soumission des données du formulaire');
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erreur lors de la soumission des données du formulaire :",
                footer: '<a href="#">Why do I have this issue?</a>'
                });
            console.error('Erreur lors de la soumission des données du formulaire :', error);
        }
    };
    
    // Exemple d'utilisation
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        submitForm(formDataObject);
    });
})
