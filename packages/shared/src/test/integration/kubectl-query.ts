import { Kubectl } from "../../main/roles/create/env-setup/tasks/kubectl";

const zzz = ()=>{
    let kubectl = new Kubectl();
    let watchOnNamespaces = kubectl.watchNamespace('default');
}

zzz();