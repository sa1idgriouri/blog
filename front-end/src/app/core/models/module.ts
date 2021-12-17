export class ModuleType {
    public static General = new ModuleType(1, "Général", "", "home", [
        "Fonctionalité 1", "Fonctionalité 2", "Fonctionalité 3"
    ]);

    public static AppointmentMaking = new ModuleType(2, "Prise de rendez-vous", "Ajouter la prise de rendez-vous à votre centre d'appel", "date_range", [
        "Fonctionalité 1", "Fonctionalité 2", "Fonctionalité 3"
    ], [ModuleType.General]);

    public static VoIP = new ModuleType(3, "VoIP", "Plateforme d'appel convenable aux centres d'appels", "call", [
        "Fonctionalité 1", "Fonctionalité 2", "Fonctionalité 3"
    ]);

    public static Payroll = new ModuleType(4, "Cycle de vie de l'employée", "Suivez le cycle de vie de votre employé", "group", [
        "Fonctionalité 1", "Fonctionalité 2", "Fonctionalité 3"
    ]);

    public static Accounting = new ModuleType(5, "Comptabilité", "Automatisez le travail du comptable", "account_balance_wallet", [
        "Fonctionalité 1", "Fonctionalité 2", "Fonctionalité 3"
    ], [ModuleType.Payroll]);

    constructor(value: number, name: string, description: string, icon: string, features: string[] = [], prerequisites: ModuleType[] = []) {
        this.value = value;
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.prerequisites = prerequisites;
        this.features = features;
        this.price = 15 + value;
    }

    public static getAll(): ModuleType[] {
        return [this.General, this.VoIP, this.Payroll, this.AppointmentMaking, this.Accounting];
    }

    readonly value: number;
    readonly name: string;
    readonly description: string;
    readonly icon: string;
    readonly features: string[];
    readonly price: number;
    readonly prerequisites: ModuleType[];
}