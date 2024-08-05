using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FM.PAP.LESSON
{
    public class UtilsAttendance
    {
        public static Dictionary<string, string> mandatoryFields = new Dictionary<string, string>
                    {
                        { "res_classroombooking", "Lezione" },
                        { "res_startingtime", "Ora Inizio" },
                        { "res_endingtime", "Ora Fine" },
                        { "res_subscriberid", "Iscritto" },
                        { "res_participationmode", "Partecipazione In Presenza" },
                        { "res_signature", "Firma" }
                    };

        public static Dictionary<string, string> readOnlyFields = new Dictionary<string, string>
                    {
                        { "res_code", "Codice" },
                        { "createdon", "Data creazione" },
                        { "res_date", "Data" }
                    };

        public static string GenerateCode(string[] codeSegments)
        {
            StringBuilder code = new StringBuilder();

            if (codeSegments == null) return "";
            foreach (string segment in codeSegments)
            {
                if (segment == null) continue;
                foreach (char c in segment)
                {
                    if (char.IsUpper(c) || char.IsNumber(c))
                    {
                        code.Append(c);
                    }
                }
            }
            return code.ToString();
        }

    }
}


