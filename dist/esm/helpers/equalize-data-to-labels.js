export const equalizeDataToLabels = (data) => {
    // check if labels count equal to each datasets data count, if no then equalize
    const { datasets, labels } = data;
    const validatedDatasets = datasets.map(dataset => {
        // avoid mutable original dataset !!!
        const newDataset = JSON.parse(JSON.stringify(dataset));
        if (newDataset.data.length === labels.length)
            return newDataset;
        if (newDataset.data.length < labels.length) {
            const count = labels.length - newDataset.data.length;
            // push empty string count times
            for (let i = 0; i < count; i++) {
                newDataset.data.push('');
            }
            return newDataset;
        }
        if (newDataset.data.length > labels.length) {
            const data = newDataset.data.slice(0, labels.length);
            return {
                ...newDataset,
                data
            };
        }
    });
    return {
        datasets: validatedDatasets,
        labels
    };
};
//# sourceMappingURL=equalize-data-to-labels.js.map