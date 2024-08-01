


C:\Users\FedericoM\source\repos\Area01\WebResources\.GlobalPickListConstants = new function () {
	var self = this;
	self.GlobalOptionSets = {

		/// Seleziona un tipo di impegno constants.
		activity_mailmergetypecodeValues: {
			Appuntamento: 4201,
			Email: 4202,
			Emailtramitestampaunione: 42020,
			Fax: 4204,
			Faxtramitestampaunione: 42040,
			Lettera: 4207,
			Letteratramitestampaunione: 42070,
			Telefonata: 4210
		},

		/// Seleziona un tipo di impegno constants.
		activity_typecodeValues: {
			Appuntamento: 4201,
			Email: 4202,
			Fax: 4204,
			Lettera: 4207,
			Telefonata: 4210
		},

		/// Tipo di oggetto constants.
		activityfileattachment_objectcodeValues: {
			Pubblica: 8000,
			Pubblicacommento: 8005
		},

		/// Tipo di impegno constants.
		activitypointer_activitytypecodeValues: {
			Appuntamento: 4201,
			Appuntamentoricorrente: 4251,
			Attivita: 4212,
			Attivitacampagna: 4402,
			AvvisodiCustomerVoice: 10582,
			ChatdiTeams: 10168,
			Chiusuraofferta: 4211,
			Chiusuraopportunita: 4208,
			Chiusuraordine: 4209,
			Commentoportale: 10293,
			Conversazione: 10691,
			Email: 4202,
			Fax: 4204,
			Impegnoditiposervizio: 4214,
			InvitoalsondaggioCustomerVoice: 10592,
			Lettera: 4207,
			Minicampagna: 4406,
			Riscattoinvito: 10292,
			Risoluzionedelcaso: 4206,
			RispostaalsondaggioCustomerVoice: 10594,
			Rispostacampagna: 4401,
			Sessione: 10708,
			Telefonata: 4210,
			TrascrizioneCopilot: 10630
		},

		/// Priorità recapito constants.
		activitypointer_deliveryprioritycodeValues: {
			Alta: 2,
			Bassa: 0,
			Normale: 1
		},

		/// Aggiungi elenco marketing constants.
		addlistcampaignValues: {
			Allacampagnaeatutteleattivitadellacampagnanondistribuite: 1,
			Soloallacampagna: 0
		},

		/// AIOperationOverrideType constants.
		aioperationoverridetypeValues: {
			Delete: 1,
			Upsert: 0
		},

		/// AIPluginSubType constants.
		aipluginsubtypeValues: {
			CertifiedConnector: 1,
			Conversational: 5,
			CustomApi: 6,
			CustomConnector: 8,
			Dataverse: 0,
			Flow: 3,
			Prompt: 4,
			QA: 2,
			RestApi: 7
		},

		/// AIPluginType constants.
		aiplugintypeValues: {
			Connector: 2,
			CustomConnector: 1,
			Dataverse: 0,
			Flow: 3
		},

		/// Tipo allocazione constants.
		allocationtypeValues: {
			Numerodicasi: 0,
			Numerodiore: 1
		},

		/// Application Access. constants.
		applicationaccessValues: {
			Allowed: 0,
			Blocked: 1
		},

		/// Cloud name for which Application Based Access List is requested constants.
		applicationbasedaccesslist_cloudValues: {
			Arlington: 2,
			Gallatin: 1,
			PPE: 3,
			Prod: 0
		},

		/// Tipo di caratteristica di risorsa prenotabile constants.
		bookableresourcecharacteristictypeValues: {
			Certificazione: 2,
			Competenza: 1
		},

		/// Tipo di ruolo di condivisione raccolta di componenti constants.
		botcomponentcollectionsharingroletypeValues: {
			Autoreraccoltacomponenti: 3,
			Utentechatbot: 1,
			Utenteraccoltacomponenti: 2
		},

		/// Criteri di riutilizzo per il componente secondario chatbot constants.
		botcomponentreusepolicyValues: {
			Nessuno: 0,
			Privato: 1,
			Pubblico: 2
		},

		/// Tipo di ruolo condivisione chatbot constants.
		botsharingroletypesValues: {
			Autorechatbot: 2,
			Responsabilechatbot: 1,
			Revisorechatbot: 3
		},

		/// Costi preventivati constants.
		budgetstatusValues: {
			Acquistopossibile: 1,
			Acquistoprobabile: 2,
			Acquistosicuro: 3,
			Nessunbudgetimpegnato: 0
		},

		/// Invia mailing diretto a constants.
		bulkemail_recipientValues: {
			Recordselezionatinellapaginacorrente: 1,
			Tuttiirecorddellapaginacorrente: 2,
			Tuttiirecorddituttelepagine: 3
		},

		/// Send Direct Email To constants.
		bulkemail_recipientsValues: {
			Allrecordsonallpages: 3,
			Allrecordsoncurrentpage: 2,
			Selectedrecordsoncurrentpage: 1
		},

		/// Capability constants.
		capabilityValues: {
			actions: 118690005,
			blob: 118690002,
			cloud: 118690004,
			composite: 118690000,
			gateway: 118690003,
			tabular: 118690001
		},

		/// Preferenza di chiusura dei casi constants.
		cascadecaseclosurepreferenceValues: {
			Chiudituttiicasifiglioquandoilcasopadreechiuso: 0,
			Nonconsentirelachiusuradelcasopadrefinoaquandotuttiicasifigliononsonochiusi: 1
		},

		/// Lingua chatbot constants.
		chatbotlanguageValues: {
			Arabo: 1025,
			Ceco: 1029,
			Cinesesemplificato: 2052,
			Cinesetradizionale: 1028,
			Coreano: 1042,
			Danese: 1030,
			Finlandese: 1035,
			Francese: 1036,
			FranceseCanada: 3084,
			Giapponese: 1041,
			Greco: 1032,
			Hindi: 1081,
			Indonesiano: 1057,
			Inglese: 1033,
			IngleseAustralia: 3081,
			IngleseRegnoUnito: 2057,
			Italiano: 1040,
			Norvegese: 1044,
			Olandese: 1043,
			Polacco: 1045,
			Portoghesebrasiliano: 1046,
			Russo: 1049,
			Spagnolo: 1034,
			SpagnoloStatiUniti: 21514,
			Svedese: 1053,
			Tedesco: 1031,
			Thai: 1054,
			Turco: 1055
		},

		/// Stato componente constants.
		componentstateValues: {
			Eliminato: 2,
			Eliminatononpubblicato: 3,
			Nonpubblicata: 1,
			Pubblicato: 0
		},

		/// Tipo di componente constants.
		componenttypeValues: {
			Allegato: 35,
			Appcanvas: 300,
			Assemblyplugin: 91,
			Attributo: 2,
			Attributovisualizzazione: 6,
			Autorizzazionecampo: 71,
			Categoriareport: 33,
			Chiaveentita: 14,
			Comandobarramultifunzione: 48,
			Condizioneregoladirilevamentoduplicati: 45,
			Condizionesupplementarerelazione: 8,
			Configurazioneanalisientita: 430,
			ConfigurazioneIA: 402,
			Configurazioneimmagineattributo: 431,
			Configurazioneimmagineentita: 432,
			Configurazionepredefinitacontrollopersonalizzato: 68,
			Connettore1: 371,
			Connettore2: 372,
			Contrattodiservizio: 152,
			Controllocomplesso: 64,
			Controllopersonalizzato: 66,
			Definizionevariabilediambiente: 380,
			Differenzabarramultifunzione: 55,
			Effettodivisualizzazionequerysalvate: 59,
			Elementodelcontrattodiservizio: 153,
			ElementodiprofiliCRMMobileOffline: 162,
			Elementoregoladiconversione: 155,
			Elementoregoladigestione: 151,
			Endpointservizio: 95,
			Entita: 1,
			Entitareport: 32,
			Etichettalocalizzata: 7,
			Flussodilavoro: 29,
			Gruppocontestualebarramultifunzione: 49,
			ImmaginepassaggiodielaborazionemessaggioSDK: 93,
			Importamapping: 208,
			Indice: 18,
			Mappadelsito: 62,
			Mappingattributi: 47,
			Mappingentita: 46,
			Mappingoriginedati: 166,
			Mappingschedebarramultifunzionecomandi: 53,
			Mappingstringavisualizzata: 23,
			ModellodiarticolodellaKnowledgeBase: 38,
			Modellodicontratto: 37,
			Modellodimessaggio: 36,
			Modellodistampaunione: 39,
			Modulo: 24,
			Modulodisistema: 60,
			Organizzazione: 25,
			PassaggiodielaborazionemessaggioSDK: 92,
			Personalizzazionebarramultifunzione: 50,
			PrivilegeObjectTypeCode: 17,
			Privilegio: 16,
			Privilegioruolo: 21,
			ProfiloCRMMobileOffline: 161,
			Profilodisicurezzacampi: 70,
			ProgettoIA: 401,
			Proprietagestita: 13,
			Querysalvata: 26,
			Regolabarramultifunzione: 52,
			Regoladiconversione: 154,
			Regoladigestione: 150,
			Regoladirilevamentoduplicati: 44,
			Regoladisomiglianza: 165,
			Regolagerarchia: 65,
			Relazione: 3,
			Relazionedientita: 10,
			Relazioniditiporelazionedientita: 12,
			Report: 31,
			RisorsaWeb: 61,
			Ruolo: 20,
			Ruolodiconnessione: 63,
			Ruolorelazionedientita: 11,
			SDKMessage: 201,
			SDKMessageFilter: 202,
			SdkMessagePair: 203,
			SdkMessageRequest: 204,
			SdkMessageRequestField: 205,
			SdkMessageResponse: 206,
			SdkMessageResponseField: 207,
			Setdiopzioni: 9,
			Stringavisualizzata: 22,
			Tipodiplugin: 90,
			TipodiprogettoIA: 400,
			Valoreelencoadiscesaattributi: 4,
			Valorericercaattributi: 5,
			Valorevariabilediambiente: 381,
			Visibilitareport: 34,
			WebWizard: 210
		},

		/// Categoria constants.
		connectionrole_categoryValues: {
			Altro: 5,
			Azienda: 1,
			Famiglia: 2,
			Parteinteressata: 1000,
			Servizio: 1002,
			Sociale: 3,
			TEAMDIVENDITA: 1001,
			Vendite: 4
		},

		/// Tipo di connettore constants.
		connectortypeValues: {
			ConnectionLess: 2,
			CustomConnector: 1,
			NotSpecified: 0
		},

		/// Stato di disattivazione della risposta campagna constants.
		convert_campaign_response_deactivate_statusValues: {
			Annullato: 2,
			Chiusa: 1
		},

		/// Opzione Converti risposta campagna constants.
		convert_campaign_response_optionValues: {
			Chiudirisposta: 4,
			Convertiinunleadesistente: 2,
			Creaunlead: 1,
			Creaunoffertaunordineounopportunitaperunaccountouncontatto: 3
		},

		/// Converti opzioni di risposta alla campagna constants.
		convert_campaign_response_optionsValues: {
			Chiudirisposta: 3,
			Convertiinunleadesistente: 1,
			Creaunlead: 0,
			Creaunoffertaunordineounopportunitaperunaccountouncontatto: 2
		},

		/// Opzioni Imposta lead come qualificato di Converti risposta campagna constants.
		convert_campaign_response_qualify_lead_optionsValues: {
			Impostaleadcomenonqualificato: 1,
			Impostaleadcomequalificato: 0
		},

		/// Tipo di entità Converti risposta campagna in vendite constants.
		convert_campaign_response_sales_entity_typeValues: {
			Offerta: 3,
			Opportunita: 1,
			Ordine: 2
		},

		/// Stato di impostazione come non qualificato Converti risposta campagna in lead constants.
		convert_campaign_response_to_lead_disqualify_statusValues: {
			Annullata: 7,
			Noncontattabile: 5,
			Nonpiuinteressato: 6,
			Persa: 4
		},

		/// Opzione Converti risposta campagna in lead constants.
		convert_campaign_response_to_lead_optionValues: {
			Impostacomenonqualificato: 2,
			Impostacomequalificatoeconvertineirecordseguenti: 1
		},

		/// Stato di impostazione come qualificato Converti risposta campagna in lead constants.
		convert_campaign_response_to_lead_qualify_statusValues: {
			Qualificato: 3
		},

		/// Impegni di tipo canale constants.
		convertrule_channelactivityValues: {
			Appuntamento: 4201,
			Attivita: 4212,
			AvvisodiCustomerVoice: 10582,
			ChatdiTeams: 10168,
			Commentoportale: 10293,
			Conversazione: 10691,
			Email: 4202,
			Impegnoditiposervizio: 4214,
			Impegnosocial: 4216,
			InvitoalsondaggioCustomerVoice: 10592,
			Riscattoinvito: 10292,
			RispostaalsondaggioCustomerVoice: 10594,
			Sessione: 10708,
			Telefonata: 4210,
			TrascrizioneCopilot: 10630
		},

		/// Copilot Example Question Knowledge Type constants.
		copilotexamplequestiontknowledgetypeValues: {
			ExampleKnowledge: 1,
			ExampleQuestion: 0
		},

		/// Tipo di campo API personalizzata constants.
		customapifieldtypeValues: {
			Boolean: 0,
			DateTime: 1,
			Decimal: 2,
			Entity: 3,
			EntityCollection: 4,
			EntityReference: 5,
			Float: 6,
			GUID: 12,
			Integer: 7,
			Money: 8,
			Picklist: 9,
			String: 10,
			StringArray: 11
		},

		/// Conferma eliminazione serie appuntamenti constants.
		delete_recurringappointmentmasterValues: {
			Laserielasciagliappuntamentipassati: 2,
			Tutteleistanze: 1
		},

		/// Tipo di dipendenza constants.
		dependencytypeValues: {
			Nessuno: 0,
			Nonpubblicata: 4,
			Pubblicato: 2,
			Soluzioneinterna: 1
		},

		/// Protocollo di autenticazione constants.
		emailserverprofile_authenticationprotocolValues: {
			Dibase: 3,
			Negotiate: 1,
			NTLM: 2,
			OAuth: 4,
			Rilevaautomaticamente: 0
		},

		/// Tipo di entità constants.
		entitytypeValues: {
			Caso: 0
		},

		/// Read Unmasked constants.
		field_security_permission_readunmaskedValues: {
			AllRecords: 3,
			NotAllowed: 0,
			OneRecord: 1
		},

		/// Sì/No booleano constants.
		field_security_permission_typeValues: {
			Consentito: 4,
			Nonconsentito: 0
		},

		///  constants.
		flipswitch_optionsValues: {
			Attivato: 1,
			Disattivato: 0
		},

		/// Full Sync State constants.
		fullsyncstateValues: {
			AcceptMerge: 5,
			Completed: 3,
			Failed: 6,
			Initiating: 1,
			InProgress: 2,
			Invalid: 4,
			NotInitialized: 0
		},

		/// Periodo fiscale constants.
		goal_fiscalperiodValues: {
			Agosto: 108,
			Annuale: 301,
			Aprile: 104,
			Dicembre: 112,
			Febbraio: 102,
			Gennaio: 101,
			Giugno: 106,
			Luglio: 107,
			Maggio: 105,
			Marzo: 103,
			Novembre: 111,
			Ottobre: 110,
			P1: 401,
			P10: 410,
			P11: 411,
			P12: 412,
			P13: 413,
			P2: 402,
			P3: 403,
			P4: 404,
			P5: 405,
			P6: 406,
			P7: 407,
			P8: 408,
			P9: 409,
			Semestre1: 201,
			Semestre2: 202,
			Settembre: 109,
			Trimestre1: 1,
			Trimestre2: 2,
			Trimestre3: 3,
			Trimestre4: 4
		},

		/// Anno fiscale constants.
		goal_fiscalyearValues: {
			AF1970: 1970,
			AF1971: 1971,
			AF1972: 1972,
			AF1973: 1973,
			AF1974: 1974,
			AF1975: 1975,
			AF1976: 1976,
			AF1977: 1977,
			AF1978: 1978,
			AF1979: 1979,
			AF1980: 1980,
			AF1981: 1981,
			AF1982: 1982,
			AF1983: 1983,
			AF1984: 1984,
			AF1985: 1985,
			AF1986: 1986,
			AF1987: 1987,
			AF1988: 1988,
			AF1989: 1989,
			AF1990: 1990,
			AF1991: 1991,
			AF1992: 1992,
			AF1993: 1993,
			AF1994: 1994,
			AF1995: 1995,
			AF1996: 1996,
			AF1997: 1997,
			AF1998: 1998,
			AF1999: 1999,
			AF2000: 2000,
			AF2001: 2001,
			AF2002: 2002,
			AF2003: 2003,
			AF2004: 2004,
			AF2005: 2005,
			AF2006: 2006,
			AF2007: 2007,
			AF2008: 2008,
			AF2009: 2009,
			AF2010: 2010,
			AF2011: 2011,
			AF2012: 2012,
			AF2013: 2013,
			AF2014: 2014,
			AF2015: 2015,
			AF2016: 2016,
			AF2017: 2017,
			AF2018: 2018,
			AF2019: 2019,
			AF2020: 2020,
			AF2021: 2021,
			AF2022: 2022,
			AF2023: 2023,
			AF2024: 2024,
			AF2025: 2025,
			AF2026: 2026,
			AF2027: 2027,
			AF2028: 2028,
			AF2029: 2029,
			AF2030: 2030,
			AF2031: 2031,
			AF2032: 2032,
			AF2033: 2033,
			AF2034: 2034,
			AF2035: 2035,
			AF2036: 2036,
			AF2037: 2037,
			AF2038: 2038
		},

		/// Origine caso constants.
		incident_caseorigincodeValues: {
			Email: 2,
			Facebook: 2483,
			IoT: 700610000,
			Telefono: 1,
			Twitter: 3986,
			Web: 3
		},

		/// Tipo di modulo Risoluzione incidente constants.
		incidentresolutionformtypeValues: {
			FinestradidialogoCreazionerapida: 3,
			Finestradidialogopersonalizzabile: 2,
			Finestradidialogostandard: 1
		},

		/// Aggiorna dopo la risoluzione constants.
		incidentupdateafterresolutionValues: {
			Casiannullati: 2,
			Casirisolti: 1,
			Casirisoltieannullati: 3,
			Nonconsentireaggiornamenti: 0
		},

		/// Comunicazione iniziale constants.
		initialcommunicationValues: {
			Contattato: 0,
			Noncontattato: 1
		},

		/// Ereditato constants.
		isinheritedValues: {
			Privilegiteamelivellodiaccessoutentedirettodibase: 1,
			Soloprivilegiteam: 0
		},

		/// Stato scadenza constants.
		knowledgearticle_expirationstateValues: {
			Archiviato: 5,
			Pubblicato: 3,
			Scaduto: 4
		},

		/// Fase di vendita lead constants.
		lead_salesstageValues: {
			Qualifica: 0
		},

		/// Main Fewshot Entity Supported Type constants.
		mainfewshotentitytypeValues: {
			Custom: 1,
			OOB: 0
		},

		/// Maker Fewshot SQL Correctness constants.
		makerfewshotsqlcorrectnessValues: {
			Invalid: 2,
			NotSure: 3,
			PendingValidation: 0,
			Valid: 1
		},

		/// Tipo di obiettivo constants.
		metric_goaltypeValues: {
			Decimal: 1,
			Integer: 2,
			Money: 0
		},

		/// Entità abilitate per Mobile Offline constants.
		mobileofflineenabledentitiesValues: {
			Account: 1,
			AccountLeads: 16,
			Allegato: 1001,
			Allegatoentita: 10647,
			Allegatofileimpegno: 10167,
			Appuntamento: 4201,
			Associazioneproprieta: 1235,
			Attivita: 4212,
			AvvisoIoT: 10384,
			Caso: 112,
			CategoriadispositivoIoT: 10386,
			Coda: 2020,
			ComandodispositivoIoT: 10387,
			Concorrente: 123,
			Connessione: 3234,
			ContactLeads: 22,
			Contatto: 2,
			Contattodiritto: 7272,
			CronologiadeidatideldispositivoIoT: 10389,
			CronologiadiregistrazionedispositivoIoT: 10391,
			Daleadaopportunita: 11075,
			DefinizionedeicomandideldispositivoIoT: 10388,
			DefinizionedellaproprietaIoT: 10394,
			Descrittoreimmagini: 1007,
			Diritto: 9700,
			DispositivoIoT: 10385,
			Elementocoda: 2029,
			ElementoSetdiopzioniproprieta: 1049,
			EventMainBusinessProcessFlow: 10962,
			Fattura: 1090,
			ImpostazioniIoT: 10397,
			Indirizzoconcorrente: 1004,
			IstanzadelproviderIoT: 10396,
			IstanzaKPIdicontrattodiservizio: 9752,
			Istanzaproprieta: 1333,
			KnowledgeArticleAttachment: 10182,
			KnowledgeArticleImage: 10176,
			KnowledgeBaseRecordincidente: 9931,
			Lead: 4,
			LeadCompetitors: 24,
			LeadProduct: 27,
			Listinoprezzi: 1022,
			Messaggioemail: 4202,
			Nota: 5,
			Offerta: 1084,
			Opportunita: 3,
			OpportunityCompetitors: 25,
			Ordine: 1088,
			OrganizationDataSyncFnoState: 10203,
			OrganizationDataSyncState: 10204,
			ProcessodaavvisoIoTacaso: 10400,
			Processodivenditaleadopportunita: 954,
			Processodivenditaopportunita: 953,
			Processotelefonocaso: 952,
			Prodotto: 1024,
			Prodottoconcorrente: 1006,
			Prodottodellopportunita: 1083,
			Prodottodiritto: 6363,
			Prodottofattura: 1091,
			Prodottomodellodiritto: 4545,
			Prodottoofferta: 1085,
			Prodottoordine: 1089,
			Proprieta: 1048,
			ProprietadeldispositivoIoT: 10390,
			ProviderIoT: 10395,
			Relazioneprodotti: 1028,
			Ruolodiconnessione: 3231,
			Team: 9,
			Unita: 1055,
			Unitadivendita: 1056,
			Utente: 8,
			Valuta: 9105,
			Vocedilistino: 1026
		},

		/// Nome visualizzato agente constants.
		msdyn_agentdisplaynameValues: {
			Cognome: 192350002,
			Nome: 192350001,
			Nomealternativo: 192350003,
			Nomecompleto: 192350000
		},

		/// Lingue di input agente constants.
		msdyn_agentinputlanguageValues: {
			AraboArabiaSaudita: 1025,
			BascoSpagna: 1069,
			BulgaroBulgaria: 1026,
			CatalanoSpagna: 1027,
			CecoRepubblicaCeca: 1029,
			CineseCina: 2052,
			CineseHongKong: 3076,
			CoreanoCorea: 1042,
			CroatoCroazia: 1050,
			DaneseDanimarca: 1030,
			EbraicoIsraele: 1037,
			EstoneEstonia: 1061,
			FinlandeseFinlandia: 1035,
			FranceseFrancia: 1036,
			GallegoSpagna: 1110,
			GiapponeseGiappone: 1041,
			GrecoGrecia: 1032,
			HindiIndia: 1081,
			IndonesianoIndonesia: 1057,
			IngleseStatiUniti: 1033,
			ItalianoItalia: 1040,
			KazacoKazakistan: 1087,
			LettoneLettonia: 1062,
			LituanoLituania: 1063,
			MaleseMalaysia: 1086,
			NorvegeseBokmalNorvegia: 1044,
			OlandesePaesiBassi: 1043,
			PolaccoPolonia: 1045,
			PortogheseBrasile: 1046,
			PortoghesePortogallo: 2070,
			RumenoRomania: 1048,
			RussoRussia: 1049,
			SerboalfabetocirillicoSerbia: 3098,
			SerboalfabetolatinoSerbia: 2074,
			SlovaccoSlovacchia: 1051,
			SlovenoSlovenia: 1060,
			SpagnoloSpagna: 3082,
			SvedeseSvezia: 1053,
			TedescoGermania: 1031,
			ThaiTailandia: 1054,
			TurcoTurchia: 1055,
			UcrainoUcraina: 1058,
			UnghereseUngheria: 1038,
			VietnamitaVietnam: 1066
		},

		/// Tipo di report constants.
		msdyn_analyticsreporttypeValues: {
			Bozza: 192350002,
			Impostazionepredefinita: 192350000,
			Pubblicato: 192350001
		},

		/// Opzioni versione API constants.
		msdyn_apiversionoptionsValues: {
			_2: 162450000
		},

		/// Tipo di applicazione constants.
		msdyn_applicationtypeValues: {
			Cerca: 509180005,
			CTRL: 509180003,
			Dashboard: 509180004,
			Elencoentita: 509180000,
			Personalizzato: 509180007,
			Recorddellentita: 509180001,
			RisorsaWeb: 509180002,
			SitoWebditerzeparti: 509180006
		},

		/// Tipo di passaggio configurazione assegnazione constants.
		msdyn_assignmentconfigurationsteptypeValues: {
			Assegnazione: 192350002,
			Definizionepriorita: 192350000,
			Selezioneregolaassegnazione: 192350001
		},

		/// Tipo allegato constants.
		msdyn_attachmenttypeValues: {
			Immagine: 700610000,
			Video: 700610001
		},

		/// BasePresenceStatus constants.
		msdyn_basepresencestatusValues: {
			Assente: 192360003,
			Disponibile: 192360000,
			Occupato: 192360001,
			OccupatoNondisturbare: 192360002,
			Offline: 192360004
		},

		/// BgJobStatus constants.
		msdyn_bgjobstatusValues: {
			cancelled: 100000004,
			failed: 100000003,
			failedandacknowledged: 100000006,
			inprogress: 100000001,
			notstarted: 100000000,
			succeeded: 100000002,
			succeededandacknowledged: 100000005
		},

		/// BgJobWorkItemType constants.
		msdyn_bgjobworkitemtypeValues: {
			Agentstream: 100000001,
			Workstream: 100000000
		},

		/// Tipo di risorsa prenotabile constants.
		msdyn_bookableresourcetypeValues: {
			Account: 5,
			Attrezzature: 4,
			Contatto: 2,
			Elementogenerico: 1,
			Personale: 6,
			Pool: 8,
			Struttura: 7,
			Utente: 3
		},

		/// Set di opzioni formato capacità constants.
		msdyn_capacityformatValues: {
			Basatosuprofilo: 192360000,
			Basatosuunita: 192350000
		},

		/// Tipo di parte di contesto sul messaggio del canale constants.
		msdyn_channelmessagecontextparttypeValues: {
			plaintext: 192350000,
			record: 192350001
		},

		/// Tipo di parte del messaggio di canale constants.
		msdyn_channelmessageparttypeValues: {
			binario: 192350003,
			html: 192350001,
			immagine: 192350004,
			plaintext: 192350000,
			record: 192350005,
			url: 192350002
		},

		/// Locale constants.
		msdyn_ci_localeValues: {
			arae: 140,
			arbh: 150,
			areg: 160,
			ariq: 170,
			arjo: 180,
			arkw: 190,
			arlb: 200,
			arom: 210,
			arqa: 220,
			arsa: 230,
			arsy: 240,
			dadk: 260,
			dede: 20,
			engb: 10,
			enus: 0,
			eses: 50,
			esmx: 60,
			fifi: 280,
			frca: 120,
			frfr: 30,
			heil: 250,
			itit: 40,
			jajp: 70,
			nbno: 290,
			nlnl: 110,
			ptbr: 80,
			ptpt: 130,
			svse: 270,
			zhcn: 90
		},

		/// Computation Accuracy constants.
		msdyn_computationaccuracyValues: {
			Complete: 100000000,
			Partial: 100000001
		},

		/// ConsoleApplicationNotificationAction constants.
		msdyn_consoleapplicationnotificationactionValues: {
			Consenti: 100000000,
			Nega: 100000001
		},

		/// ConsoleApplicationParameterRuntimeType constants.
		msdyn_consoleapplicationparameterruntimetypeValues: {
			boolean: 110000002,
			json: 110000003,
			numero: 110000001,
			string: 110000000
		},

		/// Stato constants.
		msdyn_conversation_statecodeValues: {
			Aperta: 0,
			Attiva: 1,
			Chiusa: 3,
			Conclusa: 4,
			Inattesa: 2
		},

		/// Motivo stato constants.
		msdyn_conversation_statuscodeValues: {
			Aperta: 1,
			Attiva: 2,
			Chiusa: 4,
			Conclusa: 5,
			Inattesa: 3
		},

		/// Tipo di impostazioni locali lingua azione di conversazione constants.
		msdyn_conversationaction_language_localeValues: {
			arSA: 1025,
			bgBG: 1026,
			caES: 1027,
			csCZ: 1029,
			daDK: 1030,
			deDE: 1031,
			elGR: 1032,
			enUS: 1033,
			esES: 3082,
			etEE: 1061,
			euES: 1069,
			fiFI: 1035,
			frFR: 1036,
			glES: 1110,
			heIL: 1037,
			hiIN: 1081,
			hrHR: 1050,
			huHU: 1038,
			idID: 1057,
			itIT: 1040,
			jaJP: 1041,
			kkKZ: 1087,
			koKR: 1042,
			ltLT: 1063,
			lvLV: 1062,
			msMY: 1086,
			nbNO: 1044,
			nlNL: 1043,
			plPL: 1045,
			ptBR: 1046,
			ptPT: 2070,
			roRO: 1048,
			ruRU: 1049,
			skSK: 1051,
			slSI: 1060,
			srCyrlCS: 3098,
			srLatnCS: 2074,
			svSE: 1053,
			thTH: 1054,
			trTR: 1055,
			ukUA: 1058,
			viVN: 1066,
			zhCN: 2052,
			zhHK: 3076,
			zhTW: 1028
		},

		/// Origine caratteristiche conversazione constants.
		msdyn_conversationcharacteristicsourceValues: {
			BasatasuML: 321240001,
			Basatasuregole: 321240000,
			Manuale: 321240002
		},

		/// Stato della caratteristica di conversazione constants.
		msdyn_conversationcharacteristicstatusValues: {
			Attivo: 192350000,
			Eliminato: 192350001
		},

		/// Dataflow Template State constants.
		msdyn_dataflowtemplatestateValues: {
			Active: 100000001,
			Deprecated: 100000003,
			Draft: 100000000,
			Published: 100000002
		},

		/// Stato caricamento dati constants.
		msdyn_dataloadconfigstatusValues: {
			Approvata: 648140000,
			Insospeso: 648140001
		},

		/// Tipo di set di dati constants.
		msdyn_datasettypeValues: {
			Bridge: 192350002,
			DirectQuery: 192350001,
			Importa: 192350000
		},

		/// Tipo di componente Dataverse constants.
		msdyn_dataversecomponenttypeValues: {
			APIpersonalizzata: 192350000,
			Sconosciuto: 0
		},

		/// Tipo di set di regole constants.
		msdyn_decisionrulesettypeValues: {
			BasatosumodelloML: 192350001,
			ComponentiDataverse: 192350002,
			Dichiarativa: 192350000,
			Distribuzionediconversazioniintelligente: 192350003
		},

		/// Mostra notifiche desktop constants.
		msdyn_desktopnotificationsettingsValues: {
			Mai: 100000002,
			Quandolappeinbackground: 100000003
		},

		/// Impostazioni notifiche desktop constants.
		msdyn_desktopnotificationvisibilityValues: {
			Mai: 509180000,
			Quandolappeinbackground: 509180001,
			Sempre: 509180002
		},

		/// Evento dispositivo constants.
		msdyn_deviceeventValues: {
			AvvisoIoT: 192350000,
			Caso: 192350001,
			Ordinedilavoro: 192350002
		},

		/// Tipo di modello di messaggio e-mail constants.
		msdyn_emailtemplatetypeValues: {
			Promozionale: 279010001,
			Transazionale: 279010000
		},

		/// Tipo evento constants.
		msdyn_eventtypeValues: {
			Personalizzato: 100000001,
			Sistema: 100000000
		},

		/// Tipo di estensione constants.
		msdyn_extensiontypeValues: {
			Personalizzata: 387300001,
			Sistema: 387300000
		},

		/// Tipo di canale del partecipante esterno constants.
		msdyn_externalparticipantchanneltypeValues: {
			Numeroditelefono: 426120000
		},

		/// Stato contrassegnato constants.
		msdyn_flaggedstatusValues: {
			AutoBlocked: 100000002,
			Bloccato: 100000003,
			Rivedi: 100000001
		},

		/// Stato modello constants.
		msdyn_iermlmodelstatusValues: {
			Bozza: 100000000,
			Pubblicazionecompletata: 100000002,
			Trainingeseguito: 100000001
		},

		/// Stato del training del modello constants.
		msdyn_iermlmodeltrainingstatusValues: {
			Caricamentodatiincorso: 100000007,
			Pubblicazionecompletata: 100000006,
			Pubblicazioneincorso: 100000004,
			Pubblicazionenonriuscita: 100000005,
			Trainingcompletato: 100000002,
			Trainingincorso: 100000001,
			Trainingnoncompletato: 100000000,
			Trainingnonriuscito: 100000003
		},

		/// Tipo di configurazione caricamento dati constants.
		msdyn_importconfigtypeValues: {
			Conversazione: 617690000
		},

		/// IntentSources constants.
		msdyn_intentsourcesValues: {
			AgentAssist: 100000004,
			AnswerAssist: 100000002,
			EmailAssist: 100000001,
			PVA: 100000000,
			UR: 100000003
		},

		/// Aggregazione IoT constants.
		msdyn_iotaggregationValues: {
			Conteggio: 192350005,
			Max: 192350003,
			Media: 192350001,
			Min: 192350002,
			Nessuno: 192350000,
			Somma: 192350004
		},

		/// Formato dati del campo constants.
		msdyn_iotfielddataformatValues: {
			Diretto: 192350000,
			JSON: 192350001
		},

		/// Tipo di mapping constants.
		msdyn_iotmappingtypeValues: {
			Identificatoredispositivo: 192350000,
			Identificatoreregola: 192350001,
			Proprietadispositivo: 192350002
		},

		/// Tipo di ricerca constants.
		msdyn_iotsearchtypeValues: {
			Percorsodiretto: 192350000,
			Percorsovalorechiave: 192350001
		},

		/// Origine IoT constants.
		msdyn_iotsourceValues: {
			Altro: 192350000,
			AzureIoTCentral: 192350002,
			AzureIoTSuite: 192350001
		},

		/// Accuratezza calcolo KPI constants.
		msdyn_kpicomputationaccuracyValues: {
			Completa: 100000000,
			Parziale: 100000001
		},

		/// Lingue constants.
		msdyn_languagecodesValues: {
			EnglishenUS: 100000001,
			FrenchfrFR: 100000002
		},

		/// Grado lead constants.
		msdyn_leadgradeoptsetValues: {
			GradoA: 0,
			GradoB: 1,
			GradoC: 2,
			GradoD: 3
		},

		/// Tendenza punteggio lead constants.
		msdyn_leadscoretrendoptsetValues: {
			Incalo: 2,
			Increscita: 0,
			Informazioniinsufficienti: 3,
			Stabile: 1
		},

		/// msdyn_liveworkitemeventtype constants.
		msdyn_liveworkitemeventtypeValues: {
			ContextUpdated: 192350002,
			CustomerRejoin: 192350003,
			Datadicreazione: 192350001,
			Predefinito: 192350000,
			SkillIdentified: 192350005
		},

		/// Tipo di modello ML constants.
		msdyn_mlmodeltypeValues: {
			Basatosullavalutazione: 192350001,
			Basatosullavororichiesto: 192350002,
			Basatosullecompetenze: 192350000
		},

		/// Stato del training del modello constants.
		msdyn_mltrainingstatusValues: {
			Bozza: 192350000,
			Caricamentodatiincorso: 326340008,
			Configurazionepubblicazionecreata: 326340007,
			Configurazionetrainingcreata: 326340001,
			Pubblicazionecompletata: 326340003,
			Pubblicazioneincorso: 326340000,
			Pubblicazionenonriuscita: 326340002,
			Trainingcompletato: 326340006,
			Trainingincorso: 326340005,
			Trainingnonriuscito: 326340004
		},

		/// Stato distribuzione constants.
		msdyn_msdyn_unifiedroutingrun_msdyn_routingstatusValues: {
			Assegnazioneagentecompletata: 100000006,
			Codaregolediassegnazionecompletate: 100000005,
			Codaregoledidefinizionedelleprioritacompletate: 100000003,
			Codaregolediselezioneassegnazionecompletate: 100000004,
			Flussodilavororegolediclassificazioneelaborazioneincorso: 100000001,
			FlussodilavororegoleDistribuisciacodacompletate: 100000002,
			Regolediassunzionecompletate: 100000000
		},

		/// Tema notifica constants.
		msdyn_notificationthemeValues: {
			Leggero: 509180001,
			Scuro: 509180000
		},

		/// Tipi di notifica constants.
		msdyn_notificationtypesValues: {
			Schermatapopupconrifiuto: 100000002,
			Schermatapopupcontimeout: 100000001,
			Sessioneapertadirettamente: 100000000
		},

		/// Number of Search Results Options constants.
		msdyn_numberofsearchresultsValues: {
			_10: 0,
			_15: 1,
			_20: 2,
			_25: 3,
			_30: 4,
			_40: 5,
			_50: 6
		},

		/// Modalità constants.
		msdyn_ocadminmodeValues: {
			Legacy: 717210000,
			Semplificato: 717210001
		},

		/// Tipo di autenticazione constants.
		msdyn_ocauthenticationtypeValues: {
			OAuth20Codeflow: 192350001,
			OAuth20implicitflow: 192350000
		},

		/// Aree endpoint per l'impostazione dell'autenticazione constants.
		msdyn_ocauthsettingendpointregionsValues: {
			Canada: 192440002,
			RegnoUnito: 192440003,
			StatiUniti: 192440001
		},

		/// Opzioni di chiamata constants.
		msdyn_occallingoptionsValues: {
			Chiamatavocaleevideochiamata: 192350001,
			Nessunachiamata: 192350000,
			Solovoce: 192350002
		},

		/// Opzioni motivo evento sessione chiamante constants.
		msdyn_occallsessioneventreasonsValues: {
			Accettato: 192350019,
			AgentConversationJoin: 192350041,
			AgentDisconnected: 192350010,
			AgentEndConsult: 192350032,
			AgentEndConversation: 192350030,
			AgentInviteRejected: 192350008,
			AgentInviteTimeout: 192350009,
			AgentMonitor: 192350040,
			AgentTimeout: 192350011,
			AgentTransfer: 192350001,
			AgentTransferred: 192350012,
			Anteprima: 192350042,
			AssignToAgentBySupervisor: 192350026,
			AssignToQueueBySupervisor: 192350027,
			AutoAccept: 192350006,
			AutoAccepted: 192350020,
			BotEndConversation: 192350025,
			BotTransferSession: 192350024,
			Chiuso: 192350007,
			Consulenza: 192350039,
			ConversationExpired: 192350038,
			CustomerDisconnect: 192350014,
			CustomerEndConversation: 192350029,
			CustomerRejoin: 192350028,
			CustomerTimeout: 192350013,
			Disconnetti: 192350021,
			Fine: 192350023,
			ForceClose: 192350033,
			Impostazionepredefinita: 192350000,
			OverflowAssignToQueue: 192350036,
			OverflowEndConversation: 192350035,
			OverflowQueueTransfer: 192350034,
			PostchatSurvey: 192350004,
			PreChatSurvey: 192350003,
			QueueTransfer: 192350002,
			Riassegnato: 192350016,
			Rifiutato: 192350017,
			SessionEndAfterWrapUp: 192350037,
			SessionTimeout: 192350015,
			SupervisorTransferToAgent: 192350031,
			TimedOut: 192350018,
			Timeout: 192350022,
			UserAccept: 192350005
		},

		/// Destinatario del messaggio constants.
		msdyn_ocmessagereceiverValues: {
			Agente: 192350000,
			Cliente: 192350001
		},

		/// Trigger modello di messaggio constants.
		msdyn_ocmessagetemplatetriggerValues: {
			Aldifuoridellafinestradiconversazionedi24ore: 1
		},

		/// Tipo di impostazioni locali lingua messaggio RTF constants.
		msdyn_ocrichobject_msdyn_localeValues: {
			arSA: 1025,
			bgBG: 1026,
			caES: 1027,
			csCZ: 1029,
			daDK: 1030,
			deDE: 1031,
			elGR: 1032,
			enUS: 1033,
			esES: 3082,
			etEE: 1061,
			euES: 1069,
			fiFI: 1035,
			frFR: 1036,
			glES: 1110,
			heIL: 1037,
			hiIN: 1081,
			hrHR: 1050,
			huHU: 1038,
			idID: 1057,
			itIT: 1040,
			jaJP: 1041,
			kkKZ: 1087,
			koKR: 1042,
			ltLT: 1063,
			lvLV: 1062,
			msMY: 1086,
			nbNO: 1044,
			nlNL: 1043,
			plPL: 1045,
			ptBR: 1046,
			ptPT: 2070,
			roRO: 1048,
			ruRU: 1049,
			skSK: 1051,
			slSI: 1060,
			srCyrlCS: 3098,
			srLatnCS: 2074,
			svSE: 1053,
			thTH: 1054,
			trTR: 1055,
			ukUA: 1058,
			viVN: 1066,
			zhCN: 2052,
			zhHK: 3076,
			zhTW: 1028
		},

		/// Tipi di messaggio RTF constants.
		msdyn_ocrichobjecttypeValues: {
			ApplePay: 192350006,
			Autenticazione: 192350007,
			CollegamentoRTFsitoWeb: 192350000,
			CollegamentoRTFvideo: 192350001,
			JSONpersonalizzata: 192350004,
			Moduli: 192350009,
			Rispostasuggerita: 192350005,
			Selezioneelenco: 192350002,
			Selezioneora: 192350003
		},

		/// Stato record di training constants.
		msdyn_ocsitrainingdatastatusValues: {
			Approvata: 326340000,
			Insospeso: 326340001,
			Richiedeulterioriindagini: 326340002
		},

		/// Stato modello constants.
		msdyn_ocskillidentmlmodelstatusValues: {
			Bozza: 100000000,
			Pubblicazionecompletata: 100000002,
			Trainingeseguito: 100000001
		},

		/// Stato del training del modello constants.
		msdyn_ocskillidentmlmodeltrainingstatusValues: {
			Caricamentodatiincorso: 100000007,
			Pubblicazionecompletata: 100000006,
			Pubblicazioneincorso: 100000004,
			Pubblicazionenonriuscita: 100000005,
			Trainingcompletato: 100000002,
			Trainingincorso: 100000001,
			Trainingnoncompletato: 100000000,
			Trainingnonriuscito: 100000003
		},

		/// Tipo di evento messaggio di sistema constants.
		msdyn_ocsystemmessageeventtypeValues: {
			Agenteassegnatoallaconversazione: 192350017,
			Agentedisconnessodallaconversazione: 192350013,
			Chiamatavocaleaccettata: 192350027,
			Chiamatavocalerichiesta: 192350026,
			Chiamatavocalerifiutata: 192350028,
			Chiamatavocaleterminata: 192350033,
			Clientedisconnesso: 192350020,
			Clientemessoinattesa: 192350042,
			Consulenzaaccettata: 192350001,
			Consulenzaavviata: 192350003,
			Consulenzarifiutata: 192350007,
			Datiinsufficientiperiltempomediodiattesa: 192350064,
			Ilclienteeilprossimonellacoda: 192350024,
			Ilclienteharifiutatoesplicitamentelaconversazioneasincrona: 192350057,
			Ilclientehaterminatolaconversazione: 192350019,
			Ilclientenonepiuinattesa: 192350043,
			Ilsupervisorehaforzatolachiusuradellaconversazione: 192350072,
			Impossibileallegareilfiledelclientepercheetroppogrande: 192350038,
			Impossibileassegnarelagenteallaconversazione: 192350018,
			Impossibileinviareilmessaggioaldifuoridellintervalloditempoconsentito: 192350029,
			Impossibileinviareilmessaggiodelclientealdifuoridelleorediattivita: 192350023,
			Impossibileinviareilmessaggiodelclienteservizionondisponibile: 192370001,
			Impossibileinviareilmessaggiodellagente: 192350022,
			Impossibileinviareilmessaggioilfilenonpuoessereallegato: 192350040,
			ImpossibileinviareilmessaggioolallegatoSpecificadeidettaglidellerroretracuiadesempiocodicedierroremotivodellerroreIDmessaggiotimestampeIDtransazione: 192350044,
			ImpossibileinviareilmessaggiounaccountdicanalenonpuoinviareunmessaggioaunaltroaccountallinternodiMulticanale: 192350034,
			Impossibilerecapitareilmessaggiotipodimessaggiononsupportato: 192350025,
			ImpossibiletrovarelaccountdicanaleinMulticanale: 192350037,
			InviailnumerodimessaggichedesiderieticontatteremoilpiuprestopossibileLacronologiadellachatverrasalvatainmododapoteruscireetornareinqualsiasimomento: 192350041,
			Lagenteestatorimossodallaconversazionediconsulenza: 192350063,
			Lagentehaabbandonatolaconversazioneconilcliente: 192350059,
			Lagentehaabbandonatolaconversazionediconsulenza: 192350058,
			Lagentehaaccettatolaconversazionediconsulenza: 192350060,
			Lagentehaterminatolaconversazione: 192350014,
			Lagentehaterminatolaconversazionediconsulenza: 192350062,
			Lagentepartecipaallaconversazione: 192350000,
			Lagentepartecipaallaconversazioneconilcliente: 192350061,
			Limiteditempoperunaconversazionedellaversionedivalutazionesuperato: 192350054,
			Limitediutilizzodellaversionedivalutazionesuperato: 192350053,
			Messaggiodiaperturapercanaliasincronievoce: 192350056,
			Messaggiodifestivitaalcliente: 192350035,
			Messaggiofuoridalleorediattivitaalcliente: 192350036,
			Posizionedelclientenellacoda: 192350021,
			Registrazioneetrascrizioneavviate: 192350049,
			Registrazioneetrascrizioneinterrotte: 192350052,
			Registrazioneetrascrizioneriprese: 192350051,
			Registrazioneetrascrizionesospese: 192350050,
			Richiamataclienteperofferta: 192350073,
			Richiestaconsulenzanonriuscita: 192350004,
			RispostaAppleOAuthnonvalida: 192350071,
			Rispostarichiamatacliente: 192350074,
			Sessionediconsulenzaterminata: 192350016,
			Sessioneterminata: 192350015,
			Tempodiattesaperlagentequandoilclienteedisconnesso: 192350070,
			Tempomediodiattesapericlientiminuti: 192350030,
			Tempomediodiattesapericlientiore: 192350031,
			Tempomediodiattesapericlientioreeminuti: 192350032,
			Terminaconversazioneacausadelloverflow: 192350055,
			Timeoutrichiestadiconsulenza: 192350009,
			Timeouttrasferimentoadagente: 192350010,
			Trascrizioneavviata: 192350045,
			Trascrizioneinterrotta: 192350048,
			Trascrizioneripresa: 192350047,
			Trascrizionesospesa: 192350046,
			Trasferimentoacodaavviato: 192350011,
			Trasferimentoacodanonriuscito: 192350012,
			Trasferimentoadagenteaccettato: 192350002,
			Trasferimentoadagentenonriuscito: 192350006,
			Trasferimentoadagenterichiesto: 192350005,
			Trasferimentoadagenterifiutato: 192350008,
			Trasferisciallacodafuoridalleorediattivita: 192350039
		},

		/// Tipo di messaggio di sistema constants.
		msdyn_ocsystemmessagetypeValues: {
			Messaggioautomatico: 2,
			Modellodimessaggio: 3
		},

		/// Grado opportunità constants.
		msdyn_opportunitygradeoptsetValues: {
			GradoA: 0,
			GradoB: 1,
			GradoC: 2,
			GradoD: 3
		},

		/// Tendenza punteggio opportunità constants.
		msdyn_opportunityscoretrendoptsetValues: {
			Incalo: 2,
			Increscita: 0,
			Informazioniinsufficienti: 3,
			Stabile: 1
		},

		/// Tipo di azione di overflow constants.
		msdyn_overflowactiontypeValues: {
			Predefinito: 192350000,
			Restaincoda: 192350006,
			Richiamatadiretta: 192350003,
			Segreteriatelefonica: 192350004,
			Terminaconversazione: 192350001,
			Trasferimentoincoda: 192350005,
			Trasferisciatelefono: 192350002
		},

		/// Stato di visualizzazione proprietario constants.
		msdyn_ownerviewstateValues: {
			Nascosto: 2,
			Nonvisualizzato: 0,
			Visualizzato: 1
		},

		/// Opzioni stato pannello constants.
		msdyn_panelstateoptionsValues: {
			Ancorato: 162450002,
			Nascosto: 162450001,
			Ridottoaicona: 162450000
		},

		/// PaneState constants.
		msdyn_panestateValues: {
			Bloccato: 100000000,
			Nascosto: 100000002,
			Ridottoaicona: 100000001
		},

		/// Impostazioni locali constants.
		msdyn_personalmessage_localefieldValues: {
			arSA: 1025,
			bgBG: 1026,
			caES: 1027,
			csCZ: 1029,
			daDK: 1030,
			deDE: 1031,
			elGR: 1032,
			enUS: 1033,
			esES: 3082,
			etEE: 1061,
			euES: 1069,
			fiFI: 1035,
			frFR: 1036,
			glES: 1110,
			heIL: 1037,
			hiIN: 1081,
			hrHR: 1050,
			huHU: 1038,
			idID: 1057,
			itIT: 1040,
			jaJP: 1041,
			kkKZ: 1087,
			koKR: 1042,
			ltLT: 1063,
			lvLV: 1062,
			nbNO: 1044,
			nlNL: 1043,
			plPL: 1045,
			ptBR: 1046,
			ptPT: 2070,
			roRO: 1048,
			ruRU: 1049,
			skSK: 1051,
			srLatnCS: 2074,
			svSE: 1053,
			thTH: 1054,
			trTR: 1055,
			zhCN: 2052,
			zhHK: 3076,
			zhTW: 1028
		},

		/// Tipo di utente tipo constants.
		msdyn_personasecurityrolemapping_msdyn_personatypeValues: {
			Agente: 3,
			Amministratore: 1,
			Supervisore: 2,
			Utentedellapplicazione: 4
		},

		/// Priorità constants.
		msdyn_playbookactivity_priorityValues: {
			Alta: 2,
			Bassa: 0,
			Normale: 1
		},

		/// Ora constants.
		msdyn_playbookactivity_timeValues: {
			_0000: 1200,
			_0100: 100,
			_0200: 200,
			_0300: 300,
			_0400: 400,
			_0500: 500,
			_0600: 600,
			_0700: 700,
			_0800: 800,
			_0900: 900,
			_1000: 1000,
			_1100: 1100,
			_1200: 0,
			_1300: 1300,
			_1400: 1400,
			_1500: 1500,
			_1600: 1600,
			_1700: 1700,
			_1800: 1800,
			_1900: 1900,
			_2000: 2000,
			_2100: 2100,
			_2200: 2200,
			_2300: 2300
		},

		/// Modalità sondaggio constants.
		msdyn_postconversationsurveymodeValues: {
			Inseriscisondaggionellaconversazione: 192350000,
			Inviailcollegamentodelsondaggioallaconversazione: 192350001
		},

		/// Tendenza del punteggio predittivo constants.
		msdyn_predictivescoretrendValues: {
			Costante: 1,
			Incalo: 2,
			Increscita: 0,
			Informazioniinsufficienti: 3
		},

		/// Grado di punteggio predittivo constants.
		msdyn_predictivescoringgradeValues: {
			ClasseD: 3,
			GradoA: 0,
			GradoB: 1,
			GradoC: 2
		},

		/// Modalità backup agente preferito constants.
		msdyn_preferredagentbackupmodeValues: {
			NextBestAssignment: 192350001,
			NoAssignment: 192350000
		},

		/// Tipo di proprietà constants.
		msdyn_propertytypeValues: {
			Booleano: 192350002,
			Dataora: 192350003,
			Numero: 192350000,
			Stringa: 192350001
		},

		/// Strategia assegnazione coda constants.
		msdyn_queueassignmentstrategyValues: {
			AssegnazioneMulticanale: 192350000,
			Configurazioneassegnazionepersonalizzata: 192350002,
			Periododiinattivitapiulungo: 192350003,
			RoundRobin: 192350001
		},

		/// Set di opzioni tipo di coda constants.
		msdyn_queuetypeValues: {
			Entita: 192350001,
			Messaggistica: 192350000
		},

		/// Cardinalità relazione constants.
		msdyn_relationship_cardinalityValues: {
			Molti: 387300001,
			Una: 387300000
		},

		/// Stato approvazione constants.
		msdyn_reviewstatusValues: {
			Approvato: 1,
			Ignorato: 2,
			Nonapprovato: 0
		},

		/// Tipo di passaggio configurazione distribuzione constants.
		msdyn_routingconfigurationsteptypeValues: {
			Arricchimento: 192350000,
			Identificazionecoda: 192350002,
			Identificazionecompetenze: 192350001
		},

		/// Fase errore di distribuzione constants.
		msdyn_routingfailurestageValues: {
			Classificazionerichiesta: 2000,
			Identificazionerecord: 1000,
			Nessuna: 10
		},

		/// Modalità Autore del set di regole constants.
		msdyn_rulesetauthoringmodeValues: {
			Elencodecisioni: 192350000
		},

		/// Movimento di vendita constants.
		msdyn_salesmotion_typeValues: {
			Impostazionepredefinita: 1
		},

		/// Gioco di vendita constants.
		msdyn_salesplay_typeValues: {
			Impostazionepredefinita: 1
		},

		/// durata del timeout del popup constants.
		msdyn_screenpoptimeoutValues: {
			_120: 120,
			_150: 150,
			_180: 180,
			_210: 210,
			_240: 240,
			_270: 270,
			_30: 30,
			_300: 300,
			_60: 60,
			_90: 90
		},

		/// Sottotipo di passaggio sequenza constants.
		msdyn_sequencestep_subtypeValues: {
			AdvanceToOtherSequence: 5,
			LinkedInConnect: 3,
			LinkedInGetIntroduced: 2,
			LinkedInMail: 4,
			LinkedInResearch: 1,
			Valorepredefinito: 0
		},

		/// Tipo di passaggio sequenza constants.
		msdyn_sequencestep_typeValues: {
			Attesa: 0,
			Attivita: 4212,
			Azioneautomatica: 4,
			AzioneLinkedIn: 5,
			Condizionesemplice: 1,
			Email: 4202,
			Messaggioemailautomatico: 3,
			SMS: 4213,
			SMSautomatico: 6,
			Sperimentazioneautomatica: 7,
			Telefonata: 4210
		},

		/// Lingue supportate modelli di sequenza constants.
		msdyn_sequencetemplatesupportedlanguagesValues: {
			AraboArabiaSaudita: 1025,
			BascoSpagna: 1069,
			BulgaroBulgaria: 1026,
			CatalanoSpagna: 1027,
			CecoRepubblicaCeca: 1029,
			CineseCina: 2052,
			CineseHongKong: 3076,
			Cinesetradizionale: 1028,
			CoreanoCoreadelSud: 1042,
			CroatoCroazia: 1050,
			DaneseDanimarca: 1030,
			EbraicoIsraele: 1037,
			EstoneEstonia: 1061,
			FinlandeseFinlandia: 1035,
			FranceseFrancia: 1036,
			GallegoSpagna: 1110,
			GiapponeseGiappone: 1041,
			GrecoGrecia: 1032,
			HindiIndia: 1081,
			IndonesianoIndonesia: 1057,
			IngleseStatiUniti: 1033,
			ItalianoItalia: 1040,
			KazakoKazakistan: 1087,
			LettoneLettonia: 1062,
			LituanoLituania: 1063,
			MaleseMalaysia: 1086,
			NorvegeseBokmalNorvegia: 1044,
			OlandesePaesiBassi: 1043,
			PolaccoPolonia: 1045,
			PortogheseBrasile: 1046,
			PortoghesePortogallo: 2070,
			RumenoRomania: 1048,
			RussoRussia: 1049,
			SerboalfabetocirillicoSerbia: 3098,
			SerboalfabetolatinoSerbia: 2074,
			SlovaccoSlovacchia: 1051,
			SlovenoSlovenia: 1060,
			SpagnoloSpagna: 3082,
			SvedeseSvezia: 1053,
			TedescoGermania: 1031,
			ThaiThailandia: 1054,
			TurcoTurchia: 1055,
			UcrainoUcraina: 1058,
			UnghereseUngheria: 1038,
			VietnamitaVietnam: 1066
		},

		/// sessionoutcome constants.
		msdyn_sessionoutcomeValues: {
			abbandonata: 419550003,
			nessuno: 419550000,
			riassegnata: 419550002,
			risolta: 419550001
		},

		/// Tipo di sessione constants.
		msdyn_sessiontypeoptionsValues: {
			Elementogenerico: 0,
			Entita: 1
		},

		/// Categoria constants.
		msdyn_smstemplate_categoryValues: {
			Account: 1,
			Contatto: 2,
			Lead: 4,
			Opportunita: 3,
			Utente: 8
		},

		/// Livello autorizzazione constants.
		msdyn_smstemplate_permissionValues: {
			Organizzazione: 0,
			Personafisica: 1
		},

		/// Area soluzione constants.
		msdyn_solutionarea_typeValues: {
			Impostazionepredefinita: 1
		},

		/// Tipo di posta indesiderata constants.
		msdyn_spamtypeValues: {
			Email: 100000002,
			Telefono: 100000001
		},

		/// Origine flusso constants.
		msdyn_streamsourceValues: {
			Recorddellentita: 192350000
		},

		/// Priorità consigliata constants.
		msdyn_suggestedpriorityValues: {
			Bassa: 192350002,
			Calcoloincorso: 192350000,
			Elevata: 192350001,
			Nessunsuggerimento: 192350003
		},

		/// Tipo di controllo per i suggerimenti constants.
		msdyn_suggestioncontroltypeValues: {
			Schedaadattiva: 192360000
		},

		/// Tipo di suggerimento constants.
		msdyn_suggestiontypeValues: {
			Suggerimentobot: 192360002,
			Suggerimentocasisimili: 192360001,
			SuggerimentodiarticolidellaKnowledgeBase: 192360000
		},

		/// Provider sondaggio constants.
		msdyn_surveyproviderValues: {
			CustomerVoice: 600990000,
			MicrosoftCopilotStudio: 600990001
		},

		/// Tipo intervallo di tempo constants.
		msdyn_timerangetypeValues: {
			Giorni: 192350001,
			Ore: 192350000,
			Ultima: 192350002
		},

		/// Tipo di dati di diagnostica constants.
		msdyn_unifiedroutingdiagnostic_msdyn_diagnosticdatatypeValues: {
			Diagnosticaassegnazione: 4,
			Diagnosticaclassificazionedomanda: 2,
			DiagnosticaMLrichiesta: 1,
			DiagnosticaRTQdomanda: 3,
			Sconosciuto: 0
		},

		/// Tipo di regola constants.
		msdyn_unifiedroutingdiagnostic_msdyn_ruletypeValues: {
			APIpersonalizzataDistribuisciacoda: 13,
			Assegnazione: 6,
			Assunzione: 11,
			ClassificazioneAPIcliente: 12,
			Classificazionerichiesta: 1,
			Criteridiselezioneassegnazione: 9,
			Definizionepriorita: 5,
			Distribuisciacoda: 2,
			DistribuzioneICDallacoda: 20,
			Identificazionecompetenze: 3,
			ML: 4
		},

		/// UpgradeStatus constants.
		msdyn_upgradestatusValues: {
			Avviato: 100000000,
			Completato: 100000001,
			Errore: 100000002
		},

		/// Tipo di percorso del visitatore constants.
		msdyn_visitorjourneytypeValues: {
			ArticoloKnowledgeBase: 192350002,
			Azionepersonalizzata: 192350100,
			Cerca: 192350001,
			Visualizzazionepagine: 192350000
		},

		/// Tipo di configurazione visualizzazione constants.
		msdyn_visualizationconfigtypeValues: {
			Configurazione1: 192350000,
			Configurazione2: 192350001,
			Configurazione3: 192350002
		},

		/// msdyn_vivacopilottype constants.
		msdyn_vivacopilottypeValues: {
			CopilotforSales: 10000,
			CopilotforService: 10001,
			Shared: 11000
		},

		/// Modalità di distribuzione lavoro constants.
		msdyn_workdistributionmodeValues: {
			Preleva: 192350001,
			Push: 192350000
		},

		/// Tipo di area di lavoro constants.
		msdyn_workspacetypeValues: {
			Diproprietadelcliente: 192350001,
			Gestito: 192350000
		},

		/// Content State constants.
		msdynce_contentstateValues: {
			Draft: 1,
			Released: 0
		},

		/// Account Activity Assignment constants.
		msdyncrm_accountactivityassignmentValues: {
			Accountcreatedby: 192350002,
			Accountowner: 192350001,
			Customerjourneyowner: 192350000
		},

		/// Assegnazione impegno constants.
		msdyncrm_activityassignmentValues: {
			Contattocreatoda: 192350002,
			Proprietariodelcontatto: 192350001,
			Proprietariopercorsodelcliente: 192350000
		},

		/// Opzioni di scelta Aggiungi al calendario constants.
		msdyncrm_addtocalendarchoiceoptionsValues: {
			Eventoesessioniregistrati: 2,
			Sololevento: 1,
			Solosessioniregistrate: 3
		},

		/// Dimensioni sfondo constants.
		msdyncrm_backgroundsizetypeValues: {
			Contiene: 164230001,
			Riempimentocopertina: 164230000
		},

		/// Tipo larghezza sfondo constants.
		msdyncrm_backgroundwidthtypeValues: {
			Larghezzacontenuto: 164230001,
			Larghezzatotale: 164230000
		},

		/// Tipo stile bordo constants.
		msdyncrm_borderstyletypeValues: {
			Doppia: 164230004,
			Lineapunteggiata: 164230002,
			Lineatratteggiata: 164230003,
			Nessuno: 164230000,
			Tintaunita: 164230001
		},

		/// Fai clic sui KPI della mappa constants.
		msdyncrm_clickmapkpisValues: {
			Clicunivoci: 192350001,
			Frequenzadiclicdelmouse: 192350002,
			Numerototalediclic: 192350000
		},

		/// Disponibilità blocchi di contenuto constants.
		msdyncrm_contentblockavailabilityValues: {
			Email: 192350000,
			Moduli: 192350001,
			Pagine: 192350002
		},

		/// Destinazione constants.
		msdyncrm_customerjourney_msdyncrm_entitytargetValues: {
			Account: 1,
			Contatto: 0
		},

		/// Scopo constants.
		msdyncrm_customerjourney_purposeValues: {
			Annuncio: 0,
			Marketingemail: 6,
			Marketingeventi: 3,
			Multiuso: 1,
			Newsletter: 5,
			Onboarding: 2,
			Transazionidigrandidimensioni: 4
		},

		/// Giorni constants.
		msdyncrm_daysValues: {
			Domenica: 192350006,
			Giovedi: 192350003,
			Lunedi: 192350000,
			Martedi: 192350001,
			Mercoledi: 192350002,
			Sabato: 192350005,
			Venerdi: 192350004
		},

		/// Tag modello predefinito constants.
		msdyncrm_default_template_tagsValues: {
			Layoutabilitato: 192350001,
			Nuovo: 192350000
		},

		/// Funzionalità della finestra di progettazione constants.
		msdyncrm_designerfeaturesValues: {
			HTML: 192350000,
			Litmus: 192350001
		},

		/// Tipo di contenuto constants.
		msdyncrm_email_contenttypeValues: {
			Predefinito: 0,
			Richiestadiconferma: 1
		},

		/// Tipo di mercato constants.
		msdyncrm_email_template_market_typeValues: {
			B2B: 0,
			B2BeB2C: 2,
			B2C: 1
		},

		/// Ottimizzato per constants.
		msdyncrm_email_template_optimized_forValues: {
			Ampiacoperturapotenziale: 0,
			Desktop: 2,
			Dispositivomobile: 1
		},

		/// Scopo constants.
		msdyncrm_email_template_purposeValues: {
			Anniversario: 21,
			Annuncio: 2,
			Benvenutoa: 18,
			Carrelloabbandonato: 15,
			Compleanno: 3,
			Completamento: 8,
			Consolidamentolead: 22,
			Contoallarovesciaperglieventi: 6,
			Doppioconsensoesplicitoconfermabasatasuemail: 23,
			Eventofuturo: 17,
			Grazie: 16,
			Informazioni: 10,
			Invitoaeventiowebinar: 7,
			Messaggidiaperturafestivita: 9,
			Newsletter: 12,
			Ospitalita: 11,
			Postacquisto: 13,
			Promozionaleupsellingcrossselling: 14,
			Promozioneblog: 4,
			Promozionecontenuti: 5,
			Riacquisizionenuovainterazione: 19,
			Richiestacommenti: 20,
			Strutturale: 0
		},

		/// Stile visivo constants.
		msdyncrm_email_template_visual_styleValues: {
			Altro: 0,
			Chiaro: 1,
			Colorato: 2,
			Scuro: 3
		},

		/// Comportamento di aggiornamento dell'entità all'invio del modulo constants.
		msdyncrm_entityupdatebehavioronsubmitValues: {
			Contattielead: 0,
			Nessunaggiornamento: 3,
			Solocontatti: 1,
			Sololead: 2
		},

		/// Stato funzionalità constants.
		msdyncrm_feature_state_option_setValues: {
			Abilitata: 192350010,
			Disabilitata: 192350020
		},

		/// Tipo adattamento constants.
		msdyncrm_fittypeValues: {
			Personalizzato: 164230001,
			Riempi: 164230000
		},

		/// KPI geografici constants.
		msdyncrm_geokpisValues: {
			Apertitotali: 192350001,
			Clicsucollegamentodireindirizzamento: 192350002,
			ClicsulsitoWeb: 192350003,
			Inviidelmodulo: 192350005,
			Numerototalediclic: 192350000,
			VisitealsitoWeb: 192350004
		},

		/// Area geografica constants.
		msdyncrm_georegionValues: {
			Altro: 192350000,
			AR: 192350024,
			CN: 192350156,
			IN: 192350356,
			PK: 192350586
		},

		/// Provider di cespiti per le opzioni della scelta di selezione immagini constants.
		msdyncrm_imagepickerassetsprovidersValues: {
			Cespitidigitali: 1,
			Commercio: 2
		},

		/// Stato test A/B e-mail constants.
		msdyncrm_marketingemailtest_statusValues: {
			Avviata: 1,
			Pubblicato: 0,
			Terminato: 2
		},

		/// Stile visivo constants.
		msdyncrm_marketingform_visualstyleValues: {
			_1colonna: 0,
			_2colonne: 1,
			Misto: 2
		},

		/// Controlli di rendering dei campi constants.
		msdyncrm_marketingformfield_renderingcontrolsValues: {
			Areatesto: 6,
			Caselladicontrollo: 7,
			Caselladitesto: 1,
			Elencoadiscesa: 8,
			Elencocaselledicontrollo: 12,
			Inputemail: 2,
			Inputnumero: 5,
			Inputtelefono: 4,
			InputURL: 3,
			Pulsantidiopzione: 9,
			Ricerca: 13,
			Selezionedata: 10,
			Selezionedataora: 11
		},

		/// Formati di dati supportati per il campo modulo di marketing constants.
		msdyncrm_marketingformfield_supporteddataformatsValues: {
			Areatesto: 2,
			Data: 6,
			Dataeora: 7,
			Email: 3,
			Telefono: 5,
			Testo: 1,
			URL: 4
		},

		/// Formati di dati supportati per il campo modulo di marketing constants.
		msdyncrm_marketingformfield_supporteddatatypesValues: {
			Dataeora: 8,
			Dueopzioni: 4,
			Numeroavirgolamobile: 6,
			Numerodecimale: 7,
			Numerointero: 5,
			Piurigheditesto: 2,
			Ricerca: 11,
			Rigasingoladitesto: 1,
			Setdiopzioni: 3,
			Setdiopzioniaselezionemultipla: 10,
			Valuta: 9
		},

		/// Tipo di contenuto constants.
		msdyncrm_marketingpage_contenttypeValues: {
			Informazionievento: 4,
			Informazionisocietaesterna: 3,
			Informazionisulprodotto: 2,
			Lanciodelprodotto: 1,
			Offerteesconti: 5,
			Richiestadiconferma: 6,
			Strutturale: 0
		},

		/// Tipo di mercato constants.
		msdyncrm_marketingpage_markettypeValues: {
			Consumatori: 1,
			Grandeimpresa: 0,
			Tutti: 2
		},

		/// Ottimizzato per constants.
		msdyncrm_marketingpage_optimizedforValues: {
			Desktop: 0,
			Dispositivomobile: 2,
			Tablet: 1
		},

		/// Scopo constants.
		msdyncrm_marketingpage_purposeValues: {
			Abbonamentoallanewsletter: 1,
			Acquisizionecontatto: 0,
			Commentievento: 5,
			Doppioconsensoesplicitoconfermabasatasuemail: 7,
			Downloadmaterialeinformativo: 3,
			Generazionelead: 2,
			Registrazioneevento: 4,
			Strutturale: 6
		},

		/// Tipo constants.
		msdyncrm_marketingpage_typeValues: {
			Centrosottoscrizioni: 1,
			Inoltraaunamico: 2,
			Paginadidestinazione: 0,
			Registrazioneevento: 3
		},

		/// Stile visivo constants.
		msdyncrm_marketingpage_visualstyleValues: {
			Altro: 3,
			Chiaro: 0,
			Colorato: 2,
			Scuro: 1
		},

		/// Stato installazione portale constants.
		msdyncrm_marketingpageconfiguration_msdyncrm_portalinstallationstatusValues: {
			Avviata: 2,
			Failed: 3,
			Nonavviata: 1
		},

		/// Tipo di integrazione portale constants.
		msdyncrm_marketingpageconfiguration_msdyncrm_portalintegrationtypeValues: {
			Forzahostinglocale: 1,
			Forzahostingportale: 2
		},

		/// Target constants.
		msdyncrm_matchingstrategy_targetValues: {
			Contatto: 192350000,
			Lead: 192350001
		},

		/// Designazione giuridica constants.
		msdyncrm_messagedesignationValues: {
			Commerciale: 0,
			Transazionale: 1
		},

		/// Ambito processo constants.
		msdyncrm_processscopeValues: {
			BusinessUnit: 270100001,
			Organizzazione: 270100000
		},

		/// Tipo di pianificazione constants.
		msdyncrm_scheduletypeValues: {
			Datafissa: 0,
			Ritardoingiorni: 1
		},

		/// Stato constants.
		msdyncrm_setupdomain_statusValues: {
			annullato: 2,
			ChiavinontrovatesuDNS: 30,
			ConfermaregistrazioneDNSincorso: 4,
			Confermato: 1,
			Erroreinterno: 32,
			Inattesadiconferma: 0,
			Nonrichiesto: 3,
			Recordnontrovato: 31
		},

		/// Elenco di canali social network per l'utilizzo nella pubblicazione social constants.
		msdyncrm_socialchannellistValues: {
			Facebook: 270100001,
			Instagram: 270100003,
			LinkedIn: 270100002,
			Twitter: 270100000
		},

		/// Source system constants.
		msdyncrm_sourcesystemValues: {
			Outboundmarketing: 100000001,
			RealtimeJourneys: 100000002
		},

		/// Ora di Ora di inizio constants.
		msdyncrm_starttimehourValues: {
			_00: 0,
			_01: 1,
			_02: 2,
			_03: 3,
			_04: 4,
			_05: 5,
			_06: 6,
			_07: 7,
			_08: 8,
			_09: 9,
			_10: 10,
			_11: 11,
			_12: 12,
			_13: 13,
			_14: 14,
			_15: 15,
			_16: 16,
			_17: 17,
			_18: 18,
			_19: 19,
			_20: 20,
			_21: 21,
			_22: 22,
			_23: 23
		},

		/// Minuto di Ora di inizio constants.
		msdyncrm_starttimeminuteValues: {
			_00: 0,
			_15: 15,
			_30: 30,
			_45: 45
		},

		/// Stato sincronizzazione LinkedIn constants.
		msdyncrm_syncstatusValues: {
			Errore: 192350002,
			Noninizializzata: 192350000,
			Sincronizzato: 192350001
		},

		/// Tipo destinazione constants.
		msdyncrm_targettypeValues: {
			_auto: 164230000,
			_padre: 164230002,
			_principale: 164230003,
			_vuoto: 164230001
		},

		/// Lingue supportate modello constants.
		msdyncrm_templatesupportedlanguagesValues: {
			AraboArabiaSaudita: 1025,
			BascoProvincebasche: 1069,
			BulgaroBulgaria: 1026,
			CatalanoCatalogna: 1027,
			CecoRepubblicaCeca: 1029,
			CineseHongKongRAS: 3076,
			CineseRepubblicapopolarecinese: 2052,
			CineseTaiwan: 1028,
			CoreanoCorea: 1042,
			CroatoCroazia: 1050,
			Danese: 1030,
			EbraicoIsraele: 1037,
			EstoneEstonia: 1061,
			FinlandeseFinlandia: 1035,
			Francese: 1036,
			FranceseCanada: 3084,
			GallegoGalizia: 1110,
			Giapponese: 1041,
			GrecoGrecia: 1032,
			IndonesianoIndonesia: 1057,
			Inglese: 1033,
			IngleseAustralia: 3081,
			IngleseCanada: 4105,
			IngleseGranBretagna: 2057,
			Italiano: 1040,
			LettoneLettonia: 1062,
			LituanoLituania: 1063,
			NorvegeseBokmalNorvegia: 1044,
			Olandese: 1043,
			PolaccoPolonia: 1045,
			PortogheseBrasile: 1046,
			PortoghesePortogallo: 2070,
			RomenoRomania: 1048,
			RussoRussia: 1049,
			SerboalfabetocirillicoSerbiaeMontenegro: 3098,
			SerboalfabetolatinoSerbiaeMontenegro: 2074,
			SlovaccoSlovacchia: 1051,
			SlovenoSlovenia: 1060,
			Spagnolo: 3082,
			SvedeseSvezia: 1053,
			Tedesco: 1031,
			ThaiTailandia: 1054,
			TurcoTurchia: 1055,
			UcrainoUcraina: 1058,
			UnghereseUngheria: 1038,
			VietnamitaVietnam: 1066
		},

		/// Scopo del sito Web constants.
		msdyncrm_website_purposeValues: {
			Generale: 192350000,
			Paginadimarketing: 192350001
		},

		/// External consent resolution channel override constants.
		msdynmkt_channelconsentresolutionoverridesValues: {
			Alwaysresolvetoconsentgiven: 238550002,
			Alwaysresolvetoconsentnotgiven: 238550003,
			Nooverride: 238550000,
			Usecustomapitoresolve: 238550001,
			UseRealtimejourneysdefaultimplementation: 238550004
		},

		/// Livello di consenso constants.
		msdynmkt_consentlevelValues: {
			Argomento: 534120001,
			Scopo: 534120000
		},

		/// Tipo di collegamento consenso constants.
		msdynmkt_consentlinktypeValues: {
			Centropreferenze: 534120003,
			Centrosottoscrizioni: 534120001,
			Collegamentoesterno: 534120002,
			Paginapreferenze: 534120000
		},

		/// Modello di consenso constants.
		msdynmkt_consentmodelValues: {
			Nonrestrittivo: 534120001,
			Restrittivo: 534120000
		},

		/// Origine consenso constants.
		msdynmkt_consentsourceValues: {
			Caricato: 534120003,
			Centropreferenze: 534120004,
			Centrosottoscrizioni: 534120006,
			EmailAnnullamentoiscrizioneelenco: 534120007,
			Interna: 534120000,
			Modulodimarketingintemporeale: 534120005,
			Paginapreferenze: 534120001,
			SMS: 534120002
		},

		/// Tipo di consenso constants.
		msdynmkt_consenttypeValues: {
			Email: 534120000,
			Personalizzato: 534120002,
			SMS: 534120001
		},

		/// Valore tipo di consenso constants.
		msdynmkt_consenttypevalueValues: {
			Comunicazionimarketing: 534120000,
			Registrazione: 534120001
		},

		/// Valore consenso constants.
		msdynmkt_consentvalueValues: {
			Conconsensoesplicito: 534120001,
			Conrifiutoesplicito: 534120002,
			Nonimpostato: 534120000
		},

		/// Tipo di punto di contatto constants.
		msdynmkt_contactpointtypeValues: {
			Email: 534120000,
			Personalizzato: 534120002,
			SMS: 534120001
		},

		/// Uso previsto messaggio CXP constants.
		msdynmkt_cxpmessageintendeduseValues: {
			Predefinito: 534120000,
			Richiestadiconferma: 534120001
		},

		/// DOI job status constants.
		msdynmkt_doijobstatus_optionsetValues: {
			EmailCreated: 1,
			EmailCreateFailed: 8,
			EmailPublished: 2,
			EmailPublishFailed: 9,
			Failed: 7,
			JourneyCreated: 3,
			JourneyCreateFailed: 10,
			JourneyPublished: 5,
			JourneyPublishFailed: 11,
			JourneyPublishingStarted: 4,
			ProcessingCompleted: 6,
			RequestAccepted: 0
		},

		/// Stato integrazione constants.
		msdynmkt_eventmetadataintegrationstatusValues: {
			Integrato: 534120001,
			NotIntegrated: 534120002,
			Sconosciuto: 534120000
		},

		/// Stato metadati evento constants.
		msdynmkt_eventmetadatastateValues: {
			Arrestoincorso: 534120003,
			Bozza: 534120000,
			Eliminato: 534120006,
			Eliminazioneincorso: 534120005,
			Interrotto: 534120004,
			Preparazioneincorso: 534120001,
			Prontoperluso: 534120002,
			Reimpostazioneincorso: 534120008,
			Riavvioincorso: 534120007
		},

		/// Stato constants.
		msdynmkt_eventmetadatastatusValues: {
			Bozza: 534120000,
			Interrotto: 534120002,
			Pubblicata: 534120001
		},

		/// Tipo di parametro evento constants.
		msdynmkt_eventparametertypeValues: {
			Identificatorecliente: 534130000,
			ProprietadelsegnaleBindingeventoCDPa: 534130004,
			ProprietadelsegnaleCDPA: 534130002,
			ProprietadelsegnalecontattabileCDPa: 534130003,
			ProprietadelsegnaleincorporataCDPA: 534130001
		},

		/// External consent resolution options constants.
		msdynmkt_externalconsentresolutionoptionsValues: {
			Alwaysresolvetoconsentgiven: 238550002,
			Alwaysresolvetoconsentnotgiven: 238550003,
			Usecustomapitoresolve: 238550001,
			UseRealtimejourneysdefaultimplementation: 238550004
		},

		/// Feature state constants.
		msdynmkt_feature_state_option_setValues: {
			Disabled: 192350020,
			Enabled: 192350010
		},

		/// Tipo adattamento constants.
		msdynmkt_fittypeValues: {
			Personalizzato: 164230001,
			Riempi: 164230000
		},

		/// Giurisdizione constants.
		msdynmkt_jurisdictionValues: {
			Altro: 534120001,
			GDPRCCPA: 534120000
		},

		/// Tipo di invio di modulo di marketing constants.
		msdynmkt_marketingformsubmissiontypeValues: {
			Acquisizionemodulo: 624650001,
			Incorporamentomodulo: 624650000,
			Moduloautonomo: 624650002
		},

		/// Tipo di modulo di marketing constants.
		msdynmkt_marketingformtypeValues: {
			Modulodimarketing: 534120000,
			Modulodiregistrazione: 534120001
		},

		/// Designazione messaggio constants.
		msdynmkt_messagedesignationValues: {
			Commerciale: 534120000,
			Transazionale: 534120001
		},

		/// OptInOut constants.
		msdynmkt_optinoutValues: {
			Conconsensoesplicito: 534120000,
			Conrifiutoesplicito: 534120001
		},

		/// Motivo stato padre constants.
		msdynmkt_parentemailstatuscodeValues: {
			Bozza: 1,
			Inattivo: 100,
			Modificalive: 3,
			Prontoperlinvio: 2
		},

		/// Lingue supportate elenco a discesa constants.
		msdynmkt_picklistsupportedlanguagesValues: {
			AraboArabiaSaudita: 1025,
			BascoProvincebasche: 1069,
			BulgaroBulgaria: 1026,
			CatalanoCatalogna: 1027,
			CecoRepubblicaCeca: 1029,
			CineseHongKongRAS: 3076,
			CineseRepubblicapopolarecinese: 2052,
			CineseTaiwan: 1028,
			CoreanoCorea: 1042,
			CroatoCroazia: 1050,
			Danese: 1030,
			EbraicoIsraele: 1037,
			EstoneEstonia: 1061,
			FinlandeseFinlandia: 1035,
			Francese: 1036,
			FranceseCanada: 3084,
			GallegoGalizia: 1110,
			Giapponese: 1041,
			GrecoGrecia: 1032,
			IndonesianoIndonesia: 1057,
			Inglese: 1033,
			IngleseAustralia: 3081,
			IngleseCanada: 4105,
			IngleseRegnoUnito: 2057,
			Italiano: 1040,
			LettoneLettonia: 1062,
			LituanoLituania: 1063,
			NorvegeseBokmalNorvegia: 1044,
			Olandese: 1043,
			PolaccoPolonia: 1045,
			PortogheseBrasile: 1046,
			PortoghesePortogallo: 2070,
			RomenoRomania: 1048,
			RussoRussia: 1049,
			SerboalfabetocirillicoSerbiaeMontenegro: 3098,
			SerboalfabetolatinoSerbiaeMontenegro: 2074,
			SlovaccoSlovacchia: 1051,
			SlovenoSlovenia: 1060,
			Spagnolo: 3082,
			SvedeseSvezia: 1053,
			Tedesco: 1031,
			ThaiTailandia: 1054,
			TurcoTurchia: 1055,
			UcrainoUcraina: 1058,
			UnghereseUngheria: 1038,
			VietnamitaVietnam: 1066
		},

		/// Tipo di segnaposto constants.
		msdynmkt_placeholdertypeValues: {
			Condizione: 2,
			Elenco: 3,
			Token: 1
		},

		/// Process scope constants.
		msdynmkt_processscopeValues: {
			Businessunit: 270100001,
			Organization: 270100000
		},

		/// Modello di imposizione scopo constants.
		msdynmkt_purposeenforcementmodelValues: {
			Disabilitata: 534120002,
			Nonrestrittivo: 534120001,
			Restrittivo: 534120000
		},

		/// Tipo di scopo constants.
		msdynmkt_purposetypeValues: {
			Comunicazionicommerciali: 534120000,
			Comunicazionitransazionali: 534120001,
			Registrazione: 534120002
		},

		/// Motivo constants.
		msdynmkt_reasonValues: {
			ConsensoesplicitoAnnuncio: 534120000,
			ConsensoesplicitoEventi: 534120002,
			ConsensoesplicitoPaginadidestinazione: 534120001,
			Nessunmotivo: 534119999,
			RifiutoesplicitoAnnullamentoiscrizioneconunclic: 534120007,
			RifiutoesplicitoIlcontenutoerairrilevante: 534120003,
			RifiutoesplicitoProblemidiprivacy: 534120006,
			RifiutoesplicitoRegistrazionedimenticata: 534120005,
			RifiutoesplicitoRicevutotroppofrequentemente: 534120004
		},

		/// Origine constants.
		msdynmkt_sourceValues: {
			Interna: 534120000,
			Paginapreferenze: 534120001,
			SMS: 534120002
		},

		/// Tipo destinazione constants.
		msdynmkt_targettypeValues: {
			_auto: 164230000,
			_padre: 164230002,
			_principale: 164230003,
			_vuoto: 164230001
		},

		/// Lingue supportate modello constants.
		msdynmkt_templatesupportedlanguagesValues: {
			AraboArabiaSaudita: 1025,
			BascoProvincebasche: 1069,
			BulgaroBulgaria: 1026,
			CatalanoCatalogna: 1027,
			CecoRepubblicaCeca: 1029,
			CineseHongKongRAS: 3076,
			CineseRPC: 2052,
			CineseTaiwan: 1028,
			CoreanoCorea: 1042,
			CroatoCroazia: 1050,
			Danese: 1030,
			EbraicoIsraele: 1037,
			EstoneEstonia: 1061,
			FinlandeseFinlandia: 1035,
			Francese: 1036,
			FranceseCanada: 3084,
			GallegoGalizia: 1110,
			Giapponese: 1041,
			GrecoGrecia: 1032,
			IndonesianoIndonesia: 1057,
			Inglese: 1033,
			IngleseAustralia: 3081,
			IngleseCanada: 4105,
			IngleseRegnoUnito: 2057,
			ItalianoItalia: 1040,
			LettoneLettonia: 1062,
			LituanoLituania: 1063,
			NorvegeseBokmalNorvegia: 1044,
			Olandese: 1043,
			PolaccoPolonia: 1045,
			PortogheseBrasile: 1046,
			PortoghesePortogallo: 2070,
			RomenoRomania: 1048,
			RussoRussia: 1049,
			SerboalfabetocirillicoSerbiaeMontenegro: 3098,
			SerboalfabetolatinoSerbiaeMontenegro: 2074,
			SlovaccoSlovacchia: 1051,
			SlovenoSlovenia: 1060,
			Spagnolo: 3082,
			SvedeseSvezia: 1053,
			Tedesco: 1031,
			ThaiTailandia: 1054,
			TurcoTurchia: 1055,
			UcrainoUcraina: 1058,
			UnghereseUngheria: 1038,
			VietnamitaVietnam: 1066
		},

		/// Tipo di fuso orario constants.
		msdynmkt_timezonetypeValues: {
			Fusoorariodellutentechecreailpercorso: 534120001,
			Fusoorariospecifico: 534120000
		},

		/// Utilizza sistema consenso Cjo per Mkt constants.
		msdynmkt_usecjoconsentsystemformktValues: {
			Migrazioneincorso: 534120001,
			No: 534120000,
			Si: 534120002
		},

		/// Consenti chat riunione constants.
		msevtmgt_allowmeetingchatValues: {
			Abilitata: 100000000,
			Disabilitata: 100000001,
			Soloinriunione: 100000002
		},

		/// Area constants.
		msevtmgt_areaValues: {
			Amministrazione: 100000000,
			CustomerService: 100000001,
			Finanza: 100000004,
			IT: 100000006,
			Legale: 100000007,
			Logistica: 100000003,
			Marketing: 100000008,
			Responsabilidirigenti: 100000002,
			Risorseumane: 100000005,
			Vendite: 100000009
		},

		/// Tipo di partecipanti constants.
		msevtmgt_audiencetypeValues: {
			Avanzato: 100000003,
			Generale: 100000000,
			Intermedio: 100000002,
			Introduttivo: 100000001
		},

		/// Chi può saltare la sala d'attesa? constants.
		msevtmgt_autoadmittedusersValues: {
			Personecheinvito: 100000004,
			Personenellamiaorganizzazioneeospiti: 100000001,
			Personenellamiaorganizzazioneorganizzazioniattendibilieospiti: 100000002,
			Solome: 100000005,
			Tutti: 100000003
		},

		/// Tipo di check-in constants.
		msevtmgt_checkintypeValues: {
			Checkinevento: 100000001,
			Checkinsessione: 100000000
		},

		/// Dimensioni società constants.
		msevtmgt_companysizeValues: {
			Da10001inpoi: 100000008,
			Da1001a2500: 100000005,
			Da101a250: 100000002,
			Da2501a5000: 100000006,
			Da251a500: 100000003,
			Da5001a10000: 100000007,
			Da501a1000: 100000004,
			Da51a100: 100000001,
			Finoa50: 100000000
		},

		/// Stato configurazione constants.
		msevtmgt_configurationstateValues: {
			Configurazionecompletata: 832530001,
			Nonconfigurato: 832530000
		},

		/// Set origine creazione constants.
		msevtmgt_creationsourceValues: {
			Dynamics: 100000001,
			MicrosoftTeams: 100000002
		},

		/// Tipo di campo di registrazione personalizzata constants.
		msevtmgt_customregistrationfieldtypeValues: {
			BooleanoSiNo: 100000001,
			Sceltamultipla: 100000002,
			Sceltasingola: 100000003,
			Testosemplice: 100000000
		},

		/// Stato sincronizzazione descrittore constants.
		msevtmgt_descriptorsyncstatusValues: {
			Modificadellacapacitaincorso: 100000003,
			Modificadellacapacitanonriuscita: 100000004,
			Nonsincronizzato: 100000005,
			PassaggioallostatoLiveincorso: 100000001,
			PassaggioallostatoLivenonriuscito: 100000002,
			Sincronizzato: 100000000
		},

		/// Set di opzioni formato evento constants.
		msevtmgt_eventformatValues: {
			Ibrido: 100000003,
			Sulposto: 100000001,
			Webinar: 100000002
		},

		/// Set di opzioni tipo di evento constants.
		msevtmgt_eventtypeValues: {
			Briefingperidirigenti: 100000001,
			Conferenza: 100000002,
			Dimostrazione: 100000003,
			Formazione: 100000004,
			Webcast: 100000005
		},

		/// Set di opzioni tipo di fornitore constants.
		msevtmgt_eventvendortypeoptionsetValues: {
			Compagniaaerea: 100000001,
			Fornitorecatering: 100000003,
			Gruppodihotel: 100000000,
			Providerdinoleggioauto: 100000002
		},

		/// Planimetria piano constants.
		msevtmgt_floorplanValues: {
			Aferrodicavallo: 100000004,
			AformadiU: 100000003,
			Aquadrato: 100000005,
			Aspinadipesce: 100000002,
			Aula: 100000001,
			Banchetto: 100000007,
			Cabaret: 100000008,
			Cocktail: 100000009,
			Salariunioni: 100000006,
			Stand: 100000010,
			Teatro: 100000000
		},

		/// Sesso constants.
		msevtmgt_genderValues: {
			Femmina: 100000001,
			Maschio: 100000000
		},

		/// Settore constants.
		msevtmgt_industryValues: {
			Altro: 100000008,
			Architetturaeprogettazione: 100000000,
			Commercioaldettaglio: 100000006,
			Distribuzioneecommercioallingrosso: 100000007,
			Editoriaestampa: 100000003,
			Manifattura: 100000002,
			Servizifinanziari: 100000001,
			Serviziprofessionali: 100000004,
			Settorepubblico: 100000005
		},

		/// Ruolo membro constants.
		msevtmgt_memberroleValues: {
			Gestionealloggi: 100000005,
			Gestioneattrezzature: 100000009,
			Gestionecatering: 100000008,
			Gestioneregistrazioni: 100000003,
			Gestionerelatori: 100000002,
			Gestionesedi: 100000000,
			Gestionesessioni: 100000001,
			Gestionesicurezza: 100000004,
			Gestionesponsorizzazioni: 100000007,
			Marketingpromozioneevento: 100000006
		},

		/// Tipo di membri constants.
		msevtmgt_membertypeValues: {
			Membrodelteamesterno: 100000001,
			Membrodelteaminterno: 100000000
		},

		/// Set di opzioni Sì/No constants.
		msevtmgt_nooryesValues: {
			No: 100000001,
			Si: 100000002
		},

		/// Notifica il set di opzioni dell'evento alle autorità constants.
		msevtmgt_notifyauthoritiesofeventoptionsetValues: {
			Completo: 100000003,
			Incompleto: 100000002,
			Nonapplicabile: 100000001
		},

		/// Set di opzioni obiettivo primario constants.
		msevtmgt_primarygoalValues: {
			Intrattenimento: 100000004,
			Istruzione: 100000003,
			Marketing: 100000001,
			Vendite: 100000002
		},

		/// Ruolo primario constants.
		msevtmgt_primaryroleValues: {
			Altro: 100000002,
			Giornalista: 100000001,
			Partecipante: 100000000
		},

		/// Stato servizio del provider constants.
		msevtmgt_providerservicestatusValues: {
			Integrita: 100000000,
			Negato: 100000002,
			Nonautenticato: 100000001,
			Nonintegro: 100000003
		},

		/// Stato pubblicazione constants.
		msevtmgt_publishstatusValues: {
			Annullata: 100000004,
			Bozza: 100000000,
			Incorso: 100000002,
			Live: 100000003,
			PassaggioallostatoLiveincorso: 100000005,
			ProntoapassareallostatoLive: 100000001
		},

		/// Tipo di sala constants.
		msevtmgt_roomtypeValues: {
			Stanzadoppia: 100000001,
			Stanzasingola: 100000000,
			Suiteexecutive: 100000003,
			Suitejunior: 100000002,
			Suitelusso: 100000004
		},

		/// Tipo di postazione constants.
		msevtmgt_seattypeValues: {
			Businessclass: 100000002,
			Economyplus: 100000001,
			Poltronaeconomica: 100000000
		},

		/// Tipo di sessione constants.
		msevtmgt_sessiontypeValues: {
			Brainstorming: 100000003,
			Discorsodiapertura: 100000001,
			Esercitazionipratichelaboratorio: 100000000,
			Formazione: 100000005,
			Generale: 100000002,
			Interruzione: 100000004
		},

		/// Set di opzioni origine di marketing constants.
		msevtmgt_sourcesystemValues: {
			Marketinginuscita: 100000001,
			Percorsiintemporeale: 100000002
		},

		/// Tipo di relatore constants.
		msevtmgt_speakertypeValues: {
			Relatoreesterno: 100000001,
			Relatoreinterno: 100000000
		},

		/// Categoria sponsorizzazione constants.
		msevtmgt_sponsorshipcategoryValues: {
			Argento: 100000002,
			Bronzo: 100000003,
			Oro: 100000001,
			Platino: 100000000
		},

		/// Tipo di sponsorizzazione constants.
		msevtmgt_sponsorshiptypeValues: {
			Attrezzature: 100000002,
			Monetario: 100000000,
			Servizi: 100000001
		},

		/// Metri quadri constants.
		msevtmgt_squareunitsValues: {
			Metriquadri1: 100000000,
			Metriquadri2: 100000001
		},

		/// Set di opzioni incompleto o completo constants.
		msevtmgt_statusValues: {
			Incorso: 100000002,
			Nonapplicabile: 100000004,
			Nonavviato: 100000001,
			Operazionecompletata: 100000003
		},

		/// Set provider di streaming constants.
		msevtmgt_streamingproviderValues: {
			Altro: 100000003,
			EventilivediTeams: 100000001,
			EventivirtualidiTeams: 100000005,
			RiunionidiTeams: 100000002,
			WebinarTeams: 100000004
		},

		/// Tipo di programma constants.
		msevtmgt_tracktypeValues: {
			Esterno: 100000001,
			Interno: 100000000
		},

		/// Preferenza tipo di veicolo constants.
		msevtmgt_vehicletypepreferenceValues: {
			Economica: 100000000,
			Grande: 100000003,
			Lusso: 100000005,
			Premium: 100000004,
			PremiumElite: 100000008,
			Standard: 100000002,
			SUV: 100000006,
			SUVdilusso: 100000007,
			Utilitaria: 100000001
		},

		/// Opzioni di invito al webinar constants.
		msevtmgt_webinarinvitationoptionsValues: {
			Consentiatuttigliutenticonuncollegamentodiparteciparealwebinar: 100000000,
			Sologliutenticoninvitopossonoparteciparealwebinar: 100000001
		},

		/// Lingua del webinar constants.
		msevtmgt_webinarlanguageValues: {
			Cinesesemplificato: 100000009,
			Cinesetradizionale: 100000013,
			Coreano: 100000011,
			Ebraico: 100000012,
			Francese: 100000001,
			Giapponese: 100000010,
			Inglese: 100000000,
			Italiano: 100000004,
			Olandese: 100000006,
			Portoghese: 100000008,
			Russo: 100000005,
			Spagnolo: 100000003,
			Tedesco: 100000002,
			Turco: 100000007
		},

		/// Anni nel settore constants.
		msevtmgt_yearsinindustryValues: {
			Da1a5anni: 100000001,
			Da5a10anni: 100000002,
			Menodiunanno: 100000000,
			Oltre10anni: 100000003
		},

		/// Set di opzioni No o Sì constants.
		msevtmgt_yesornoValues: {
			No: 100000002,
			Si: 100000001
		},

		/// Consenso constants.
		msgdpr_gdpr_consent_option_setValues: {
			_1Consenso: 587030001,
			_2Transazionale: 587030002,
			_3Abbonamenti: 587030003,
			_4Marketing: 587030004,
			_5Definizioneprofilo: 587030005
		},

		/// Valori autorizzazione colonna constants.
		mspp_columnpermissionvaluesValues: {
			Aggiorna: 746610002,
			Crea: 746610000,
			Leggi: 746610001
		},

		/// Esigenza constants.
		needValues: {
			Accessoria: 2,
			Irrinunciabile: 0,
			Necessaria: 1,
			Nessunaesigenza: 3
		},

		/// Tipo di documento constants.
		officedocument_documenttypeValues: {
			MicrosoftExcel: 1,
			MicrosoftWord: 2
		},

		/// Tipo di riunione online constants.
		onlinemeetingtypeValues: {
			RiunionediTeams: 1
		},

		/// OpenAISchemaVersion constants.
		openaischemaversionValues: {
			_10: 0
		},

		/// opportunity_salesstage constants.
		opportunity_salesstageValues: {
			Chiudi: 3,
			Proponi: 2,
			Qualifica: 0,
			Sviluppa: 1
		},

		/// Application Based Access Control Mode. constants.
		organization_applicationbasedaccesscontrolmodeValues: {
			AuditMode: 2,
			Disabled: 0,
			Enabled: 1,
			Enabledforroles: 3
		},

		/// Samesite mode for Session Cookie constants.
		organization_samesitemodeforsessioncookieValues: {
			Default: 0,
			Lax: 2,
			None: 1,
			Strict: 3
		},

		/// Ricerca posticipata constants.
		orginsightsconfiguration_lookbackValues: {
			_2H: 1,
			_30G: 4,
			_48H: 2,
			_7G: 3
		},

		/// Opzione traccia constants.
		orginsightsconfiguration_plotoptionValues: {
			Adanello: 6,
			Adanellodoppio: 9,
			Area: 3,
			Barre: 5,
			Bolla: 11,
			Colonna: 2,
			Elenco: 8,
			Infocard: 7,
			Misuratorelineare: 10,
			Riga: 1,
			Torta: 4
		},

		/// Risoluzione foto constants.
		photo_resolutionValues: {
			_1024x768: 2,
			_1600x1200: 3,
			_2048x1536: 4,
			_2592x1936: 5,
			_640x480: 1,
			Valorepredefinitodispositivo: 0
		},

		/// Origine valore parametro mashup Power BI constants.
		powerbimashupparametervaluesourceValues: {
			Dominioambiente: 200000002,
			Valoreletterale: 200000000,
			Variabilediambiente: 200000001
		},

		/// Tipo di componente Power Pages constants.
		powerpagecomponenttypeValues: {
			AccessoalsitoWeb: 12,
			Autorizzazionecolonna: 29,
			Autorizzazionetabella: 18,
			Collegamento: 32,
			CollegamentoWeb: 5,
			Componenteesperienzautente: 34,
			Elenco: 17,
			FileWeb: 3,
			Flussocloud: 33,
			Frammentodicontenuto: 7,
			Impostazionesito: 9,
			Marcatoresito: 13,
			Metadatimoduloavanzato: 21,
			Metadatimodulodibase: 16,
			Modellodipagina: 6,
			ModelloWeb: 8,
			Moduloavanzato: 19,
			Modulodibase: 15,
			PaginaWeb: 2,
			Passaggiomoduloavanzato: 20,
			Posizionamentoannuncio: 26,
			Posizionamentosondaggio: 24,
			Profiloautorizzazionicolonna: 28,
			RegoladicontrollodiaccessoallapaginaWeb: 10,
			Regoladitransizionestatopubblicazione: 31,
			Reindirizza: 30,
			RuoloWeb: 11,
			SetdicollegamentiWeb: 4,
			Statopubblicazione: 1,
			Utentebot: 27
		},

		/// Lingue di Power Pages constants.
		powerpagelanguagesValues: {
			Arabo: 1025,
			BascoProvincebasche: 1069,
			BulgaroBulgaria: 1026,
			CatalanoCatalogna: 1027,
			CecoRepubblicaCeca: 1029,
			CineseCina: 2052,
			CineseRASdiHongKong: 3076,
			CineseTradizionale: 1028,
			CoreanoCoreadelSud: 1042,
			CroatoCroazia: 1050,
			DaneseDanimarca: 1030,
			Ebraico: 1037,
			EstoneEstonia: 1061,
			FinlandeseFinlandia: 1035,
			FranceseFrancia: 1036,
			GallegoSpagna: 1110,
			GiapponeseGiappone: 1041,
			GrecoGrecia: 1032,
			HindiIndia: 1081,
			IndonesianoIndonesia: 1057,
			Inglese: 1033,
			ItalianoItalia: 1040,
			KazakoKazakistan: 1087,
			LettoneLettonia: 1062,
			LituanoLituania: 1063,
			MaleseMalaysia: 1086,
			NorvegeseBokmalNorvegia: 1044,
			OlandesePaesiBassi: 1043,
			PolaccoPolonia: 1045,
			PortogheseBrasile: 1046,
			PortoghesePortogallo: 2070,
			RumenoRomania: 1048,
			RussoRussia: 1049,
			SerboalfabetocirillicoSerbia: 3098,
			SerboalfabetolatinoSerbia: 2074,
			SlovaccoSlovacchia: 1051,
			SlovenoSlovenia: 1060,
			SpagnoloordinamentotradizionaleSpagna: 3082,
			SvedeseSvezia: 1053,
			TedescoGermania: 1031,
			ThaiThailandia: 1054,
			TurcoTurchia: 1055,
			UcrainoUcraina: 1058,
			UnghereseUngheria: 1038,
			VietnamitaVietnam: 1066
		},

		/// Direzione sincronizzazione constants.
		principalsyncattributemapping_syncdirectionValues: {
			Bidirezionale: 3,
			Nessuno: 0,
			ToCRM: 2,
			ToExchange: 1
		},

		/// Categoria fase constants.
		processstage_categoryValues: {
			Approvazione: 7,
			Chiudi: 3,
			Identifica: 4,
			Impostacomequalificato: 0,
			Indagine: 5,
			Proponi: 2,
			Risoluzione: 6,
			Sviluppa: 1
		},

		/// Processo di acquisto constants.
		purchaseprocessValues: {
			Comitato: 1,
			Sconosciuto: 2,
			Singoloutente: 0
		},

		/// Intervallo di tempo acquisti constants.
		purchasetimeframeValues: {
			Immediatamente: 0,
			Questanno: 3,
			Sconosciuto: 4,
			Trimestrecorrente: 1,
			Trimestresuccessivo: 2
		},

		/// Errore di determinazione dei prezzi  constants.
		qooi_pricingerrorcodeValues: {
			Attributodelprezzofuoriintervallo: 35,
			Codicedideterminazionedeiprezzimancante: 8,
			Codicedideterminazionedeiprezzinonvalido: 9,
			Costocorrentemancante: 15,
			Costocorrentenonvalido: 20,
			Costomediomancante: 16,
			Costomediononvalido: 21,
			Dettaglierrore: 1,
			Erroredicalcolodelprezzo: 25,
			Importodellistinoprezzimancante: 12,
			Importodellistinoprezzinonvalido: 17,
			Lavalutadellatransazionenoneimpostataperlavocedilistinodelprodotto: 38,
			Listinoprezziinattivo: 3,
			Listinoprezzimancante: 2,
			Nessuno: 0,
			Opzionediarrotondamentononvalida: 23,
			Overflowdellattributodellavalutadibase: 36,
			Percentualedellistinoprezzimancante: 13,
			Percentualedellistinoprezzinonvalida: 18,
			Precisionedideterminazionedeiprezzinonvalida: 30,
			Prezzomancante: 14,
			Prezzononvalido: 19,
			Prezzounitariomancante: 5,
			Prodottomancante: 6,
			Prodottononinclusonellistinoprezzi: 11,
			Prodottononvalido: 7,
			Quantitamancante: 4,
			Quantitanonvalida: 29,
			Regoladiarrotondamentononvalida: 22,
			Scontononvalido: 28,
			Statononvalidotipodisconto: 27,
			Tipodiscontoinattivo: 33,
			Tipodiscontononvalido: 26,
			Underflowdellattributodellavalutadibase: 37,
			Unitadimisuramancante: 10,
			Unitadimisurapredefinitadelprodottomancante: 31,
			Unitadivenditadelprodottomancante: 32,
			Valorediarrotondamentononvalido: 24,
			Valutadellistinoprezzinonvalida: 34
		},

		/// Set di opzioni SkipPriceCalculation constants.
		qooi_skippricecalculationValues: {
			DoPriceCalcAlways: 0,
			SkipPriceCalcOnRetrieve: 1
		},

		/// Set di opzioni SkipPriceCalculation constants.
		qooidetail_skippricecalculationValues: {
			DoPriceCalcAlways: 0,
			SkipPriceCalcOnCreate: 1,
			SkipPriceCalcOnUpdate: 2,
			SkipPriceCalcOnUpSert: 3
		},

		/// Tipo di prodotto constants.
		qooiproduct_producttypeValues: {
			Aggregazione: 2,
			Prodotto: 1,
			Prodottoaggregazionefacoltativo: 4,
			Prodottoaggregazioneobbligatorio: 3,
			Serviziobasatosulprogetto: 5
		},

		/// Configurazione proprietà constants.
		qooiproduct_propertiesconfigurationstatusValues: {
			Modifica: 0,
			Nonconfigurato: 2,
			Rettifica: 1
		},

		/// Metodo di creazione offerta constants.
		quotecreationmethodValues: {
			Revisione: 776160001,
			Sconosciuto: 776160000
		},

		/// Fine intervallo constants.
		rangeends_optionsValues: {
			Mai: 1,
			Perdatadifine: 3,
			Pernumerodioccorrenze: 2
		},

		/// Mese dell'anno constants.
		recurrencerule_monthofyearValues: {
			Agosto: 8,
			Aprile: 4,
			Dicembre: 12,
			Febbraio: 2,
			Gennaio: 1,
			Giugno: 6,
			Luglio: 7,
			Maggio: 5,
			Marzo: 3,
			Mesedellannononvalido: 0,
			Novembre: 11,
			Ottobre: 10,
			Settembre: 9
		},

		/// Registration Status Supported Type constants.
		registrationstatustypeValues: {
			Failed: 3,
			InProgress: 2,
			NotRegistered: 0,
			Registered: 1
		},

		/// Ripetizione constants.
		repeatpattern_optionsValues: {
			Annuale: 3,
			Giornaliera: 0,
			Mensile: 2,
			Settimanale: 1
		},

		/// Genere constants.
		res_genereValues: {
			Cisgender: 910240000,
			Genderfluid: 910240004,
			Genderqueer: 910240003,
			NonBinary: 910240002,
			Transgener: 910240001
		},

		/// Tipo di risorsa constants.
		resourcetypeValues: {
			Gruppodirisorse: 3,
			Strutturaattrezzature: 1,
			Team: 2,
			Utente: 0
		},

		/// Tipo di connessione RunDesktopFlow constants.
		rundesktopflowconnectiontypeValues: {
			Connessione: 1,
			Riferimentoaunaconnessione: 2
		},

		/// Metodo di creazione ordine constants.
		salesordercreationmethodValues: {
			Acquisisciofferta: 776160001,
			Sconosciuto: 776160000
		},

		/// Giornaliera constants.
		sameweekday_optionsValues: {
			Domenica: 3,
			Giorno: 0,
			Giornoferiale: 1,
			Giornofestivo: 2,
			Giovedi: 7,
			Lunedi: 4,
			Martedi: 5,
			Mercoledi: 6,
			Sabato: 9,
			Venerdi: 8
		},

		/// Settimanale constants.
		sameweekweek_optionsValues: {
			Prima: 1,
			Quarta: 4,
			Seconda: 2,
			Terza: 3,
			Ultima: 5
		},

		/// Search Entity constants.
		searchentityValues: {
			Entity1: 200004747,
			Entity2: 200004748,
			ReferencedEntity: 200004749
		},

		/// Criteri regola di selezione constants.
		selection_rule_criteriaValues: {
			Casualepredefinito: 0,
			Risorsamenodisponibile: 2,
			Risorsapiudisponibile: 1
		},

		/// Quantità regola di selezione constants.
		selection_rule_quantityValues: {
			_1: 1,
			_10: 10,
			_11: 11,
			_12: 12,
			_13: 13,
			_14: 14,
			_15: 15,
			_16: 16,
			_17: 17,
			_18: 18,
			_19: 19,
			_2: 2,
			_20: 20,
			_3: 3,
			_4: 4,
			_5: 5,
			_6: 6,
			_7: 7,
			_8: 8,
			_9: 9,
			Tutte: 0
		},

		/// Siti constants.
		selection_rule_sitesValues: {
			Qualsiasisito: 1,
			Stessosito: 0
		},

		/// Data di inizio constants.
		serviceappointment_startdateValues: {
			Alpiupresto: 1,
			Dataspecifica: 2,
			Domani: 5,
			Ilprossimomese: 8,
			Intervallodidate: 3,
			Laprossimasettimana: 7,
			Oggi: 4,
			Questasettimana: 6
		},

		/// Ora di inizio constants.
		serviceappointment_starttimeValues: {
			Intervallodiorari: 3,
			Mattino: 4,
			Oraspecifica: 2,
			Pomeriggio: 5,
			Qualsiasi: 1,
			Sera: 6
		},

		/// Stato constants.
		serviceappointment_statusValues: {
			Annullato: 9,
			Completati: 8,
			Nonarrivato: 10
		},

		/// Fase processo di assistenza constants.
		servicestageValues: {
			Identifica: 0,
			Ricerca: 1,
			Risolvi: 2
		},

		/// Stato convalida constants.
		sharepoint_validationstatusValues: {
			Impossibileconvalidare: 5,
			Incorso: 2,
			Nonconvalidato: 1,
			Nonvalido: 3,
			Valido: 4
		},

		/// Motivo stato convalida constants.
		sharepoint_validationstatusreasonValues: {
			Certificatinonvalidi: 7,
			Errorediautenticazione: 6,
			GlischemiURLdiMicrosoftDynamics365eSharePointsonodiversi: 4,
			ImpossibileaccedereallURLacausadelleimpostazionidisicurezzadiInternetExplorer: 5,
			LURLdelrecordevalido: 2,
			LURLdelrecordnonestatoconvalidato: 1,
			LURLdelrecordnonevalido: 3
		},

		/// Tipo di posizione constants.
		sharepointdocumentlocation_locationtypeValues: {
			DedicatoperlintegrazionediOneNote: 1,
			Generale: 0
		},

		/// ServiceType constants.
		sharepointsite_servicetypeValues: {
			Condivisiconlutentecorrente: 2,
			MSTeams: 3,
			OneDrive: 1,
			SharePoint: 0
		},

		/// Nuova interazione guidata dai metadati del contratto di servizio constants.
		sla_slaenabledentitiesValues: {
			Caso: 112
		},

		/// Tipo messaggio post constants.
		socialactivity_postmessagetypeValues: {
			Messaggioprivato: 1,
			Messaggiopubblico: 0
		},

		/// Canale social network constants.
		socialprofile_communityValues: {
			Altro: 0,
			AppleMessagesforBusiness: 16,
			Cortana: 5,
			DirectLine: 6,
			Email: 9,
			Facebook: 1,
			GooglesBusinessMessages: 17,
			GroupMe: 10,
			Kik: 11,
			Line: 3,
			MicrosoftTeams: 7,
			RiconoscimentovocaleDirectLine: 8,
			Skype: 13,
			Slack: 14,
			Telegram: 12,
			Twitter: 2,
			WeChat: 4,
			WhatsApp: 15
		},

		/// Synapse Link Destination Sync State constants.
		synapselinkdestinationsyncstateValues: {
			Completed: 2,
			None: 0,
			NotCompleted: 1
		},

		/// Synapse Link Entity Metadata State constants.
		synapselinkentitymetadatastateValues: {
			Created: 8,
			Failure: 16,
			MetadataCreating: 2,
			None: 0,
			NotCreated: 1,
			RelationshipCreating: 4
		},

		/// Synapse Link Entity Partition Strategy constants.
		synapselinkentitypartitionstrategyValues: {
			FiveDay: 3,
			HalfMonth: 2,
			Month: 1,
			Year: 0
		},

		/// Synapse Link Entity Source constants.
		synapselinkentitysourceValues: {
			Dataverse: 0,
			FnOTables: 1
		},

		/// Synapse Link Entity Sync State constants.
		synapselinkentitysyncstateValues: {
			Completed: 4,
			CompletedWithFailures: 8,
			InProgress: 2,
			None: 0,
			NotStarted: 1,
			Paused: 32,
			PostProcessing: 64,
			RequestedInitialData: 16
		},

		/// Synapse Link External Table State constants.
		synapselinkexternaltablestateValues: {
			Created: 1,
			Deleted: 3,
			Failed: 2,
			InProgress: 4,
			NotCreated: 0
		},

		/// Synapse Link Profile Entity Type constants.
		synapselinkprofileentitytypeValues: {
			Requested: 0
		},

		/// Synapse Link Profile State constants.
		synapselinkprofilestateValues: {
			Aborted: 5,
			Aborting: 4,
			Active: 1,
			Deactivated: 8,
			Deleted: 3,
			Error: 2,
			Inactive: 0,
			Suspended: 6,
			Suspending: 7
		},

		/// Synapse Link Profile Type constants.
		synapselinkprofiletypeValues: {
			EventAnalytics: 1,
			SynapseLink: 0
		},

		/// Synapse Link Schedule Recurrence Unit constants.
		synapselinkschedulerecurrenceunitValues: {
			Day: 3,
			Hour: 2,
			Minute: 1,
			Month: 5,
			None: 0,
			Week: 4,
			Year: 6
		},

		/// Synapse Link Schedule Type constants.
		synapselinkscheduletypeValues: {
			IncrementalUpdate: 1,
			Snapshot: 0
		},

		/// Synapse Link Synapse Table Creation State constants.
		synapselinksynapsetablecreationstateValues: {
			Completed: 2,
			Failed: 3,
			InProgress: 1,
			NotStarted: 0
		},

		/// Direzione sincronizzazione constants.
		syncattributemapping_syncdirectionValues: {
			Bidirezionale: 3,
			Nessuno: 0,
			ToCRM: 2,
			ToExchange: 1
		},

		/// Stato sincronizzazione constants.
		syncstatusValues: {
			Abilitato: 2,
			Insospeso: 1,
			Nonabilitato: 0
		},

		/// Visualizzazione predefinita modello constants.
		templatedefaultviewValues: {
			Visualizzazioneelenco: 3,
			Visualizzazionegriglia: 2,
			Visualizzazioneriquadri: 1
		},

		/// Utente in esecuzione constants.
		workflow_runasValues: {
			Proprietario: 0,
			Utentechiamante: 1
		},

		/// Fase flusso di lavoro constants.
		workflow_stageValues: {
			Operazionepreliminare: 20,
			Operazionesuccessiva: 40
		},

		/// Tipo di oggetto constants.
		workflowlog_objecttypecodeValues: {
			Processodisistema: 4700,
			Sessioneflusso: 4720,
			Sessioneflussodilavoro: 4710
		},

		/// Mensile constants.
		yearlymonth_optionsValues: {
			Agosto: 8,
			Aprile: 4,
			Dicembre: 12,
			Febbraio: 2,
			Gennaio: 1,
			Giugno: 6,
			Luglio: 7,
			Maggio: 5,
			Marzo: 3,
			Novembre: 11,
			Ottobre: 10,
			Settembre: 9
		}
	};

	self.GlobalBooleans = {

		/// Messaggio e-mail seguito constants.
		activitypointer_isemailfollowedValues: {
			No: 0,
			Si: 1
		},

		/// Impegno regolare constants.
		activitypointer_isregularactivityValues: {
			No: 0,
			Si: 1
		},

		/// Opzioni per le impostazioni di amministrazione di vendita constants.
		admin_settingsValues: {
			No: 0,
			Si: 1
		},

		/// Opzioni per le impostazioni di amministrazione di vendita constants.
		admin_settings_featureValues: {
			Abilitato: 1,
			Disabilitato: 0
		},

		/// Set di opzioni booleane constants.
		appmodulemetadata_boolean_optionsetValues: {
			No: 0,
			Si: 1
		},

		/// Tipo di assegnazione constants.
		assigntypeValues: {
			Utentecorrente: 0,
			Utenteoteam: 1
		},

		/// IsBaseCard constants.
		cardtype_isbasecardValues: {
			No: 0,
			Si: 1
		},

		/// IsEnabled constants.
		cardtype_isenabledValues: {
			No: 0,
			Si: 1
		},

		/// IsLiveOnly constants.
		cardtype_isliveonlyValues: {
			No: 0,
			Si: 1
		},

		/// IsPreviewCard constants.
		cardtype_ispreviewcardValues: {
			No: 0,
			Si: 1
		},

		/// Accesso all'e-mail constants.
		channelaccessprofile_emailaccessValues: {
			No: 0,
			Si: 1
		},

		/// Accesso a Facebook constants.
		channelaccessprofile_facebookaccessValues: {
			No: 0,
			Si: 1
		},

		/// Privilegi modificati constants.
		channelaccessprofile_haveprivilegeschangedValues: {
			No: 0,
			Si: 1
		},

		/// Profilo ospite constants.
		channelaccessprofile_isguestprofileValues: {
			No: 0,
			Si: 1
		},

		/// Accesso a telefono constants.
		channelaccessprofile_phoneaccessValues: {
			No: 0,
			Si: 1
		},

		/// Valuta articoli della Knowledge Base constants.
		channelaccessprofile_rateknowledgearticlesValues: {
			Consenti: 1,
			Nonconsentire: 0
		},

		/// Invia commenti e suggerimenti constants.
		channelaccessprofile_submitfeedbackValues: {
			Consenti: 1,
			Nonconsentire: 0
		},

		/// Accesso a Twitter constants.
		channelaccessprofile_twitteraccessValues: {
			No: 0,
			Si: 1
		},

		/// Visualizza valutazione articoli constants.
		channelaccessprofile_viewarticleratingValues: {
			Consenti: 1,
			Nonconsentire: 0
		},

		/// Visualizza articoli della Knowledge Base constants.
		channelaccessprofile_viewknowledgearticlesValues: {
			Consenti: 1,
			Nonconsentire: 0
		},

		/// Accesso al Web constants.
		channelaccessprofile_webaccessValues: {
			No: 0,
			Si: 1
		},

		/// Conferma interesse constants.
		confirminterestValues: {
			No: 1,
			Si: 0
		},

		/// Converti impegno constants.
		convertactivitytypeValues: {
			No: 0,
			Si: 1
		},

		/// Apri il nuovo articolo della Knowledge Base constants.
		convertknowledgearticle_openValues: {
			No: 0,
			Si: 1
		},

		/// Decisore? constants.
		decisionmakerValues: {
			completato: 1,
			segnacomecompletato: 0
		},

		/// Opzione predefinita interazione constants.
		dialogradiocheckboxdefaultoptionValues: {
			No: 0,
			Si: 1
		},

		/// Stato constants.
		documenttemplate_statusValues: {
			Attivato: 0,
			Bozza: 1
		},

		/// Promemoria e-mail impostato constants.
		email_isemailremindersetValues: {
			No: 0,
			Si: 1
		},

		/// Descrizione constants.
		evaluatefitValues: {
			No: 1,
			Si: 0
		},

		/// Concorrenti identificati? constants.
		identifycompetitorsValues: {
			completato: 1,
			segnacomecompletato: 0
		},

		/// Contatti cliente identificati? constants.
		identifycustomercontactsValues: {
			completato: 1,
			segnacomecompletato: 0
		},

		/// Team di ricerca identificato? constants.
		identifypursuitteamValues: {
			completato: 1,
			segnacomecompletato: 0
		},

		/// Includi voci di contratto annullate constants.
		includecanceledcontractlinesValues: {
			No: 0,
			Si: 1
		},

		/// Set di valori attributo crittografati constants.
		isencryptedattributevaluesetValues: {
			No: 0,
			Si: 1
		},

		/// Componente gestito constants.
		ismanagedValues: {
			Gestito: 1,
			Nongestito: 0
		},

		/// Riunione online constants.
		isonlinemeetingValues: {
			No: 0,
			Si: 1
		},

		/// Scopo operazione di sola lettura constants.
		isoperationintentreadonlyValues: {
			No: 0,
			Si: 1
		},

		/// Approva articolo constants.
		knowledgearticle_isapproverelatedValues: {
			No: 0,
			Si: 1
		},

		/// Copia articolo constants.
		knowledgearticle_iscopyrelatedValues: {
			No: 0,
			Si: 1
		},

		/// È Interno constants.
		knowledgearticle_isinternalValues: {
			No: 0,
			Si: 1
		},

		/// Ultima versione constants.
		knowledgearticle_islatestversionValues: {
			No: 0,
			Si: 1
		},

		/// Pubblica constants.
		knowledgearticle_publishValues: {
			Infuturo: 1,
			Ora: 0
		},

		/// Seleziona versioni constants.
		knowledgearticle_selectversionsValues: {
			Soloquestaversione: 0,
			Tutteleversionieletraduzioni: 1
		},

		/// Tipo di versione constants.
		knowledgearticleversionValues: {
			Principale: 0,
			Secondaria: 1
		},

		/// Indirizzo di fatturazione constants.
		lookupaddress_billtoaddressValues: {
			No: 0,
			Si: 1
		},

		/// Indirizzo di spedizione constants.
		lookupaddress_shiptoaddressValues: {
			No: 0,
			Si: 1
		},

		/// Opzioni per le impostazioni di marketing constants.
		marketing_settings_featureValues: {
			No: 0,
			Si: 1
		},

		/// Tipo di metrica constants.
		metric_typeValues: {
			Importo: 1,
			Numero: 0
		},

		/// Convalidato constants.
		mobileofflineprofile_isvalidatedValues: {
			No: 0,
			Si: 1
		},

		/// Registra andamento constants.
		msdyn_playbookinstance_msdyn_trackprogressValues: {
			No: 0,
			Si: 1
		},

		/// Abilitazione constants.
		msdyn_postconversationsurveyenableValues: {
			No: 0,
			Si: 1
		},

		/// Consenso constants.
		msdyncrm_socialconsentlistValues: {
			No: 0,
			Si: 1
		},

		///  constants.
		organization_featureenabledValues: {
			No: 0,
			Si: 1
		},

		/// Valore predefinito constants.
		orginsightsconfiguration_isdefaultValues: {
			No: 0,
			Si: 1
		},

		/// Drill-down constants.
		orginsightsconfiguration_isdrilldownValues: {
			No: 0,
			Si: 1
		},

		/// Opzioni per le impostazioni di Playbook constants.
		playbook_settings_featureValues: {
			Abilitato: 1,
			Disabilitato: 0
		},

		/// Should propose new knowledge article constants.
		proposeknowledge_incidentresolutionValues: {
			No: 0,
			Yes: 1
		},

		/// Rimozione elemento della coda constants.
		queueitemremoveValues: {
			No: 0,
			Si: 1
		},

		/// Opzioni di distribuzione degli elementi della coda constants.
		queueitemroutetoselectionValues: {
			Coda: 0,
			Utenteteam: 1
		},

		/// Calcola i ricavi effettivi dalle offerte constants.
		quote_calc_revenuefromquoteValues: {
			No: 0,
			Si: 1
		},

		/// Chiudi opportunità constants.
		quote_closepportunityValues: {
			No: 0,
			Si: 1
		},

		/// Crea un'offerta aggiornata constants.
		quote_createrevisedquoteValues: {
			No: 0,
			Si: 1
		},

		/// Tipo di copia della regola di gestione constants.
		routingrulecopytypeValues: {
			Creaunclone: 0,
			Sovrascriviunaltrosetdiregoledigestione: 1
		},

		///  constants.
		sdkmessage_autotransactValues: {
			No: 0,
			Si: 1
		},

		/// Set di opzioni Sì/No generico di Sharepoint constants.
		sharepoint_generic_yes_noValues: {
			No: 0,
			Si: 1
		},

		/// Profilo bloccato constants.
		socialprofile_isblockedValues: {
			No: 0,
			Si: 1
		},

		///  constants.
		subscriptionstatisticsoffline_fullsyncrequiredValues: {
			No: 0,
			Si: 1
		},

		/// Calcolata constants.
		syncattributemapping_iscomputedValues: {
			No: 0,
			Si: 1
		},

		/// Opzioni Usa modello constants.
		use_template_optionValues: {
			No: 0,
			Si: 1
		},

		/// Opzione per selezionare Sì o No constants.
		yesornoselectiontypeValues: {
			No: 0,
			Si: 1
		}
	};
};
