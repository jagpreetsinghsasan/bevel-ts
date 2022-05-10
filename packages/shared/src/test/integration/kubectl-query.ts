import { Kubectl } from "../../main/roles/create/env-setup/tasks/kubectl";

let kubectl = new Kubectl();
let watchOnNamespaces = kubectl.watchNamespace();