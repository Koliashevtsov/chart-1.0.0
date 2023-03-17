import HorizontalScrollingEventHandler from './event-handlers/horizontal-scrolling-event-handler';

import { getSliceIdxs, resizesConfigBase } from './helpers';

import { CustomEventHandler, HorScrolPlugOptions, IConfig, IPlugin, IPluginProps } from '../types';

class HorizontalScrolling implements IPlugin {
    id: string;
    config: IConfig;
    props: IPluginProps;
    eventHandler: CustomEventHandler;
    pluginOptions: HorScrolPlugOptions

    constructor(){
        this.id = 'horizontal-scrolling';
        this.config = null;
        this.props = null;
        this.eventHandler = null;
        this.pluginOptions = null;
    }

    init(props: IPluginProps, config: IConfig){
        this.props = props;
        this.config = config;

        const labels = this.config.data.labels;
        const clientWidth = this.config.areasSizes.white.width;
        const spaceBetweenLabels = this.props.scrolling;
        
        this.pluginOptions = {
            originalConfig: { ...this.config },
            startIdx: getSliceIdxs(labels, clientWidth, spaceBetweenLabels)[0],
            finishIdx: getSliceIdxs(labels, clientWidth, spaceBetweenLabels)[1],
            labelsStep: spaceBetweenLabels
        }
        this.eventHandler = new HorizontalScrollingEventHandler(this.pluginOptions)
    }

    private _updateConfig(){
        // update config
        const updatedConfigProps = resizesConfigBase(this.pluginOptions.originalConfig, this.pluginOptions.startIdx, this.pluginOptions.finishIdx, this.props.scrolling)
        this.config.update(updatedConfigProps)
    }

    getConfig(){
        //update config 
        this._updateConfig()
        // and retun it
        return this.config
    }

}

export default HorizontalScrolling;