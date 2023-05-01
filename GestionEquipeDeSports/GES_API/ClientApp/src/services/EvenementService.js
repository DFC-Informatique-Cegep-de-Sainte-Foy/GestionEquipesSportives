export default{
    formatDateTime(donnees) {
        var dateTimeEntree = donnees;
        var date = dateTimeEntree.split('T')[0];
        var time = dateTimeEntree.split('T')[1].split(':');
        var dateTimeSortie = date + ' ' + time[0] + ':' + time[1];

        return dateTimeSortie;
    },

    affichageTypeEvenement(data) {
        if (data === 0) {
            return "Entrainement";
        } else if (data === 1) {
            return "Partie";
        } else if (data === 2) {
            return "Autre";
        } else {
            return data;
        }
    }
};