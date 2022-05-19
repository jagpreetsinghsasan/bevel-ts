import {KubeConfig, CoreV1Api, Watch} from "@kubernetes/client-node"

export interface IKubectlOptions {
    kubectlContext: string;
    kubectlConfigFilePath: string;
}

export class Kubectl{
    public static readonly CLASS_NAME = "Kubectl";
    public readonly kubeConfig: KubeConfig;
    public readonly k8sApiClient: CoreV1Api;
    public foundNs: boolean;
    public myInterval: any;
    public get className(): string {
        return Kubectl.CLASS_NAME;
    }
    constructor(){
        this.kubeConfig = new KubeConfig();
        this.kubeConfig.loadFromDefault();
        this.k8sApiClient = this.kubeConfig.makeApiClient(CoreV1Api);
        this.foundNs = false;
        this.myInterval = 6;
    }

    alpha(){
        console.log("In alpha method")
    }

    public watchNamespace(namespace: string){
        const watch = new Watch(this.kubeConfig);
        watch.watch('/api/v1/namespaces',
        {},
        (type, apiObj) => {
            if (type == 'ADDED' && apiObj.metadata.name === namespace) {
                console.log('ADDED ' + JSON.stringify(apiObj));
                this.foundNs = true;
            }
        },
        (err) => {
        }).then((req)=>{
            this.myInterval = setInterval(()=>{
                if(this.foundNs){
                    req.abort();
                    clearInterval(this.myInterval)
                }
            }, 2*1000)
        });
        
    }
}