using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FM.PAP.LESSON
{
    public class UtilsLesson
    {
        public static Dictionary<string, string> mandatoryFields = new Dictionary<string, string>
                    {
                        { "res_moduleid", "Modulo" },
                        { "res_courseid", "Corso" },
                        { "res_sessionmode", "Modalità" },
                        { "res_inpersonparticipation", "Partecipazione In Presenza" },
                        { "res_intendeddate", "Data Prevista" },
                        { "res_intendedstartingtime", "Ora Inizio Prevista" },
                        { "res_intendedendingtime", "Ora Fine Prevista" },
                        { "res_intendedbreak", "Pausa Prevista" },
                        { "res_intendedlessonduration", "Durata Lezione Prevista" },
                        { "res_intendedbookingduration", "Durata Prenotazione Prevista" }
                    };

        public static Dictionary<string, string> readOnlyFields = new Dictionary<string, string>
                    {
                        { "res_courseid", "Corso" },
                        { "res_intendedlessonduration", "Durata Lezione Prevista" },
                        { "res_intendedbookingduration", "Durata Prenotazione Prevista" },
                        { "res_availableseats", "Posti Disponibili" },
                        { "res_takenseats", "Posti Occupati" },
                        { "res_attendees", "Partecipanti" },
                        { "res_remoteparticipationurl", "URL Partecipazione Da Remoto" },
                    };

        public static string GenerateCode(string[] codeSegments)
        {
            StringBuilder code = new StringBuilder();

            if (codeSegments == null) return "";
            foreach (string segment in codeSegments)
            {
                if (segment == null) continue;
                code.Append(segment);
            }
            return code.ToString();
        }
    }
}


